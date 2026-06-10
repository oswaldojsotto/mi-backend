export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      ok: false,
      data: null,
      message: 'Validation failed',
      errors: result.error.issues.map(i => ({ field: i.path.join('.'), message: i.message })),
    });
  }
  req.body = result.data;
  next();
};
