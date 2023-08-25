const { verifyToken } = require("../security/jwt");

const tokenValidation = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).json({
      status: "ERROR",
      message: "Token no suministrado",
    });

  try {
    const decoded = verifyToken(token);

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "ERROR", message: "No autorizado", details: error });
  }
};

module.exports = tokenValidation;
