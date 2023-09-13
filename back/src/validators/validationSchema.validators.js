const sanitizerSchema = require("../utils/sanitizerSchema");

const validationSchema = (schema) => {
  let joiValidation = (req, res, next) => {
    try {
      let { value, error } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      sanitizerSchema(req.body, value);
      console.log(error);

      if (error) {
        const errorInstance = new Error("Validation fields error");
        errorInstance.details = error.details.map((error) => error.message);
        throw errorInstance;
      }

      req.body = value;
      next();
    } catch (error) {
      return res.status(422).json({
        status: "ERROR",
        message: error.message,
        details: error.details,
      });
    }
  };
  return joiValidation;
};

module.exports = validationSchema;
