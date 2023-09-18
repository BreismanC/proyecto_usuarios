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

    req.user = decoded;

    next();
  } catch (error) {
    res.status(498).json({
      status: "ERROR",
      message: "Token inválido o expirado",
      details: error.message,
    });
  }
};

module.exports = tokenValidation;
