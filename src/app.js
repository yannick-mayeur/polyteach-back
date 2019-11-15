const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDatadog = require('connect-datadog');
const dotenv = require('dotenv');
const logger = require('./helpers/logger');

dotenv.config();

const dd_options = {
  'response_code': true,
  'tags': ['app:POLYTEACH-BACK']
};


const app = express();
const port = 3000;



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(connectDatadog(dd_options));
app.use('/', require('./routes'));

app.listen(port, () => logger.info(`Example app listening on port ${port}!`));
