module.exports = (body, schema) => {
  const keysUnknowns = [];
  const paramsSchema = Object.keys(schema);
  Object.keys(body).forEach((entry) => {
    if (!paramsSchema.includes(entry)) {
      keysUnknowns.push(entry);
    }
  });
  if (keysUnknowns.length !== 0) {
    const error = new Error("Validation error");
    error.details = keysUnknowns.map(
      (key) => `El campo ${key} no es permitido`
    );
    throw error;
  }
};
