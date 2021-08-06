// const opentelemetry = require('@opentelemetry/api');
//
// // Not functionally required but gives some insight what happens behind the scenes
// const { diag, DiagConsoleLogger, DiagLogLevel } = opentelemetry;
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
//
// const { registerInstrumentations } = require('@opentelemetry/instrumentation');
// const { NodeTracerProvider } = require('@opentelemetry/node');
// const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
// const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
// const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
//
// const { BasicTracerProvider, BatchSpanProcessor } = require('@opentelemetry/tracing');
// const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector');
//
// // const Exporter = (process.env.EXPORTER || '').toLowerCase().startsWith('z') ? ZipkinExporter : JaegerExporter;
// // const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
// const { KoaInstrumentation } = require('@opentelemetry/instrumentation-koa');
// const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
//
// module.exports = (serviceName) => {
//   console.log({ serviceName })
//   const collectorOptions = {
//     serviceName: serviceName
//   };
//
//   const exporter = new CollectorTraceExporter(collectorOptions);
//   const provider = new NodeTracerProvider();
//   registerInstrumentations({
//     tracerProvider: provider,
//     instrumentations: [
//       // Express instrumentation expects HTTP layer to be instrumented
//       HttpInstrumentation,
//       KoaInstrumentation,
//     ],
//   });
//
//   // const exporter = new Exporter({
//   //   serviceName,
//   // });
//
//   provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
//
//   // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
//   provider.register();
//
//   return opentelemetry.trace.getTracer('default-tracer');
// };