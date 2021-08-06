'use strict';

// eslint-disable-next-line import/order
const tracer = require('./utils/tracer')('example-koa-client');
const api = require('@opentelemetry/api');
const axios = require('axios').default;

function makeRequest() {
  const span = tracer.startSpan('client.makeRequest()', {
    kind: api.SpanKind.CLIENT,
  });

  api.context.with(api.trace.setSpan(api.ROOT_CONTEXT, span), async () => {
    try {
      const res = await axios.get('http://localhost:5000');
      span.setStatus({ code: api.StatusCode.OK });
      console.log(res.statusText);
    } catch (e) {
      span.setStatus({ code: 123, message: e.message });
    }
    span.end();
    console.log('Sleeping 5 seconds before shutdown to ensure all records are flushed.');
    setTimeout(() => { console.log('Completed.'); }, 5000);
  });
}

makeRequest();