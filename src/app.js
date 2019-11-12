const express = require('express');
const cors = require('cors');
const { createLogger, format, transports } = require('winston');
const connectDatadog = require('connect-datadog');
const dotenv = require('dotenv');

dotenv.config();

const dd_options = {
  'response_code': true,
  'tags': ['app:APP_NAME']
};


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


app.use(cors());
app.use(connectDatadog(dd_options));
app.use('/', require('./routes'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
