require('dotenv/config');
const express = require('express');
// const pg = require('pg');
const jsonMiddleware = express.json();
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

// const db = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
