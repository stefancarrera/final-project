require('dotenv/config');
const express = require('express');
const pg = require('pg');
const jsonMiddleware = express.json();
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const fs = require('fs');
const ClientError = require('./client-error');

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
  const newImg = `server/public/images/img${Date.now()}.png`;
  fs.writeFile(newImg, buff, err => {
    if (err) {
      console.error(err);
    }
  });
  const url = newImg;
  const sql = `
  insert into "drawings" ("userId", "drawing")
  values (1, $1)
  returning *
  `;
  const params = [url];
  db.query(sql, params)
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
