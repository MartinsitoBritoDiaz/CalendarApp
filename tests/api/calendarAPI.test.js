/**
 * @jest-environment jsdom
 */
const { default: calendarAPI } = require("../../src/api/calendarAPI");

describe("Calendar API Test", () => {
  test("should load default configuration", () => {
    expect(calendarAPI.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  // test("should have the x-token inside the heade of each request", async () => {
  //   const token = 'ABC-123-XYZ';
  //   localStorage.setItem('token',token);
  //   const res =  await calendarAPI.post('/auth', {
  //     email: 'test@gmail.com',
  //     password: '123456',
  // });
  //   expect(res.config.headers['x-token']).toBe(token)
  //   // expect( res.request ).toContain()
  // });
});
