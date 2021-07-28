require('dotenv/config');
const express = require('express');
const pg = require('pg');
const jsonMiddleware = express.json();
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const fs = require('fs');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/test', (req, res) => {
  res.json({ test: 'This is a Test' });
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
