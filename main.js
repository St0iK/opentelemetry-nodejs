const { NodeTracerProvider } = require('@opentelemetry/node');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

const { registerInstrumentations } = require('@opentelemetry/instrumentation');


const provider = new NodeTracerProvider();
const consoleExporter = new ConsoleSpanExporter();
const spanProcessor = new SimpleSpanProcessor(consoleExporter);
provider.addSpanProcessor(spanProcessor);
provider.register()

registerInstrumentations({
  instrumentations: [
    // Express instrumentation expects HTTP layer to be instrumented
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
  tracerProvider: provider,
});

const express = require('express')
const app = express()
const port = 3001

const getUrlContents = function (url, fetch) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.text())
      .then(body => resolve(body));
  })
}

app.get('/main', async function (req, res) {
  // fetch data from second service running on port 3001
  const results = await getUrlContents('http://localhost:3000/hello', require('node-fetch'))
  res.type('json')
  res.send(JSON.stringify({ hello: results }))
})

app.listen(
  port,
  function () {
    console.log(`Example app listening at http://localhost:${port}`)
  }
)