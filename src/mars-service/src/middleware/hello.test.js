import helloMiddleware from './hello';

describe('hello middleware', () => {
  it('should return hello', async () => {
    const ctx = { req: { url: '/' } };
    await helloMiddleware(ctx);
    expect(ctx.body).toBe('Hello');
  });
});
