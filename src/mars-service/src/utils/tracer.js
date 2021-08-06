'use strict';
console.log(__filename);
const { KoaInstrumentation } = require('@opentelemetry/instrumentation-koa');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

const api = require('@opentelemetry/api');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');

const EXPORTER = process.env.EXPORTER || '';

module.exports = (serviceName) => {
  console.log({serviceName})
  const provider = new NodeTracerProvider();

  const exporter = new ConsoleSpanExporter();
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  registerInstrumentations({
    instrumentations: [
      new KoaInstrumentation(),
      new HttpInstrumentation(),
    ],
    tracerProvider: provider,
  });

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  return api.trace.getTracer('koa-example');
};
