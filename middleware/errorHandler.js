export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`, err.stack);
  res.status(err.status || 500).json({
    ok: false,
    data: null,
    message: err.message || "Internal server errors",
    errors: err.errors || [],
  });
};
