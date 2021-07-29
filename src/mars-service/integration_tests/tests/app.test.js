import request from 'supertest';

describe('App', () => {
  test('index should return Hello', async () => {
    const response = await request('http://app').get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello');
  });
});
