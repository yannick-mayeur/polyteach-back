import express from 'express';
import pgPromise from 'pg-promise';
import { createLogger, format, transports } from 'winston';
import connectDatadog from 'connect-datadog';

const dd_options = {
  'response_code': true,
  'tags': ['app:APP_NAME']
};


const pgp = pgPromise({/* Initialization Options */});
const db = pgp('postgres://postgres:cdb9a442f4b99282d68ee199e1d012e6@dokku-postgres-polyteach-db:5432/polyteach_db');

const app = express();
const port = 3000;


// Logger creation
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'APP_NAME' },
  transports: [
    new transports.File({ filename: 'logs/test.log' })
  ]
});
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
} else {
  new transports.File({ filename: 'logs/test.log' });
}

app.use(connectDatadog(dd_options));

app.get('/', (req, res) => {
  logger.info('A request had been received on /');
  res.send('This is a test change!');
});

app.get('/courses', async (req, res) => {
  logger.info('A request had been received on /courses');
  try {
    const dbres = await db.any('SELECT * FROM course;');
    logger.info(dbres);
    res.send(dbres);
  } catch(e) {
    logger.error(e)
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
