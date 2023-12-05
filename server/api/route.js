export default defineEventHandler(() => {
  return {
    ROUTE_KEY: process.env.ROUTE_KEY,
  };
});
