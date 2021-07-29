// import logger from 'logger';

// import errorMiddleware from './error';

// jest.mock('logger');

// describe('downstream middleware', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should call next', async () => {
//     const ctx = { req: { url: '/' } };
//     const next = jest.fn();

//     await errorMiddleware(ctx, next);

//     expect(next).toHaveBeenCalledTimes(1);
//   });

//   it('should set the response status to 500 if next throws an error', async () => {
//     const ctx = { req: { url: '/' } };
//     const error = new Error('An error occured');
//     const next = jest.fn(() => {
//       throw error;
//     });

//     await errorMiddleware(ctx, next);

//     expect(ctx.status).toBe(500);
//   });

//   it('should set the response body if next throws an error', async () => {
//     const ctx = { req: { url: '/' } };
//     const error = new Error('An error occured');
//     const next = jest.fn(() => {
//       throw error;
//     });

//     await errorMiddleware(ctx, next);

//     expect(ctx.body).toBe('An error occured');
//   });

//   it('should log an error if next throws an error', async () => {
//     const ctx = { req: { url: '/' } };
//     const error = new Error('An error occured');
//     const next = jest.fn(() => {
//       throw error;
//     });

//     await errorMiddleware(ctx, next);

//     expect(logger.error).toHaveBeenCalledTimes(1);
//     expect(logger.error).toHaveBeenCalledWith(error);
//   });
// });
