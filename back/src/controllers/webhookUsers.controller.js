const webhookUsersService = require("../services/webhookUsers.service");
const WebhookUserService = require("../services/webhookUsers.service");

const createUserNotification = async (req, res) => {
  try {
    const userSaved = req.body;
    await webhookUsersService.createUserNotification(userSaved);
    res.status(201).json({
      status:"SUCCESS",
      message:"Notificación enviada"
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Error al intentar enviar notificación",
      error: error,
    });
  }
};

module.exports = {
  createUserNotification,
};
