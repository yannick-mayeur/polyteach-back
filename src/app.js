const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDatadog = require('connect-datadog');
const dotenv = require('dotenv');
const logger = require('./helpers/logger');

const https = require('https');
const fs = require('fs');
dotenv.config();

let staging = '';
if (process.env.NODE_ENV === 'STAGING') {
  staging = '-STAGING';
}

const dd_options = {
  'response_code': true,
  'tags': [`app:POLYTEACH-BACK${staging}`]
};

// For demo purposes we ignore self-signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const app = express();
const port = 3000;

// Listen (start app with node server.js)
const options = {
  key: fs.readFileSync(__dirname +'/openvidukey.pem','utf-8'),
  cert: fs.readFileSync(__dirname + '/openviducert.pem','utf-8')
};


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(connectDatadog(dd_options));
app.use('/', require('./routes'));

app.listen(port, () => logger.info(`Example app listening on port ${port}!`));
