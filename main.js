const tracer = require('./tracer')('example-express-server');
const api = require('@opentelemetry/api');
const express = require('express')
const app = express()
const port = 4000

const getUrlContents = function (url, fetch) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.text())
      .then(body => resolve(body));
  })
}

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