require('dotenv').config();
require('./utils/tracer')('mars-service');
require('./server').initialise();
