require('dotenv/config');
const express = require('express');
const pg = require('pg');
const jsonMiddleware = express.json();
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const AWS = require('aws-sdk');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/userDrawingsURL', (req, res) => {
  const sql = `
    select "drawing",
           "drawingId"
    from "drawings"
    where "userId" = 1
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/api/drawings', (req, res) => {
  const sql = `
  select *
  from "drawings"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/api/drawingURL/:drawingId', (req, res, next) => {
  const drawingId = parseInt(req.params.drawingId, 10);
  if (!Number.isInteger(drawingId) || drawingId < 1) {
    throw new ClientError(400, 'drawingId must be a positive integer');
  }
  const sql = `
  select "drawing"
  from "drawings"
  where "drawingId" = $1
  `;
  const params = [drawingId];
  db.query(sql, params)
    .then(result => {
      const [selectedDrawing] = result.rows;
      if (!selectedDrawing) {
        throw new ClientError(400, 'drawingId must be a positive integer');
      }
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/api/drawings/:drawingId', (req, res, next) => {
  const drawingId = parseInt(req.params.drawingId, 10);
  if (!Number.isInteger(drawingId) || drawingId < 1) {
    throw new ClientError(400, 'drawingId must be a positive integer');
  }

  const sqlOne = `
  select "drawing"
  from "drawings"
  where "drawingId" = $1
  `;
  const paramsOne = [drawingId];
  db.query(sqlOne, paramsOne)
    .then(result => {
      const [url] = result.rows;
      const urlKey = url.drawing.replace('https://5b5drawings.s3.us-east-2.amazonaws.com/', '');

      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_BUCKET_REGION
      });

      const s3 = new AWS.S3();
      const key = urlKey;
      const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
      };
      s3.deleteObject(param, (err, data) => {
        if (err) console.error(err);
      });
    });

  const sql = `
  delete from "drawings"
    where "drawingId" = $1
  returning *
  `;
  const params = [drawingId];
  db.query(sql, params)
    .then(result => {
      const [deletedDrawing] = result.rows;
      if (!deletedDrawing) {
        throw new ClientError(400, 'cannot find drawing with that drawingId');
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => next(err));
});

app.post('/api/saveImg', (req, res, next) => {
  const { imgObj } = req.body;
  const buff = Buffer.from(imgObj, 'base64');

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION
  });

  const s3 = new AWS.S3();
  const key = `img${Date.now()}.png`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buff,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  };

  s3.putObject(params, function (err, data) {
    if (err) {
      console.error(err);
    }
  });

  const url = `https://5b5drawings.s3.us-east-2.amazonaws.com/${key}`;
  const sql = `
  insert into "drawings" ("userId", "drawing")
  values (1, $1)
  returning *
  `;
  const param = [url];
  db.query(sql, param)
    .then(result => {
      const [newImage] = result.rows;
      res.status(201).json(newImage);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
