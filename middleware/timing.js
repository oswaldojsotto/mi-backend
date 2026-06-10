export const timing = (req, res, next) => {
  const start = process.hrtime.bigint();
  const originalJson = res.json.bind(res);
  res.json = function (body) {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;
    this.setHeader('X-Response-Time', `${durationMs.toFixed(2)}ms`);
    return originalJson(body);
  };
  next();
};
