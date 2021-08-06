const tracer = require('./tracer')('example-express-server');
const api = require('@opentelemetry/api');
const express = require('express')
const app = express()
const port = 4000

const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    node: 'http://localhost:9200', // es01:9200 running in a container on the same network
    log: 'debug',
    maxRetries: 2,
    requestTimeout: 10000,
    sniffOnStart: false,
  }
};
const esTransport = new ElasticsearchTransport(esTransportOpts);
const logger = winston.createLogger({
  transports: [
    esTransport
  ]
});
// Compulsory error handling
logger.on('error', (error) => {
  console.error('Error caught', error);
});
esTransport.on('warning', (error) => {
  console.error('Error caught', error);
});

const getUrlContents = function (url, fetch) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.text())
      .then(body => resolve(body));
  })
}

logger.debug('a debug message');
logger.info('an info log');

msg = 'RSAP0001I: Transaction OK'
logger.info(msg, { "errCode": "RSAP0001I", "transactionTime": 1 })

msg = 'RSAP0010E: Severe problem detected'
logger.error(msg, { "errorCode": "RSAP0010E", "transactionTime": 2 })

app.get('/main', async function (req, res) {

  const span = tracer.startSpan('main.makeRequest()', {
    kind: api.SpanKind.CLIENT,
  });

  api.context.with(api.setSpan(api.ROOT_CONTEXT, span), async () => {
    // fetch data from second service running on port 3001
    const results = await getUrlContents('http://localhost:5000/hello', require('node-fetch'))
    span.setStatus({ code: api.SpanStatusCode.OK });
    span.setAttribute('test', 'test');
    res.type('json')
    res.send(JSON.stringify({ hello: results }))
    span.end();
  });
})

app.listen(
  port,
  function () {
    console.log(`Example app listening at http://localhost:${port}`)
  }
)