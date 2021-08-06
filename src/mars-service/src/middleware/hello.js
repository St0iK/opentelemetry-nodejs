import tracer from './../utils/tracer';
//const tr = tracer('hello-client');
export default async (ctx) => {
  console.log('running!')
  ctx.body = 'Hello from jimstoik13';
};
