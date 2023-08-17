const WebhookUserService = require("../services/webhookUsers.service");
const webhookUsersService = require("../services/webhookUsers.service");

class WebhookUserController {
  static async createUserNotification(req, res) {
    try {
      const userSaved = req.body;
      await webhookUsersService.createUserNotification(userSaved);
      res.status(201).json({
        status: "SUCCESS",
        message: "Notificación enviada",
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: "ERROR",
        message: "Error al intentar enviar notificación",
        error: error,
      });
    }
  }

  static async commitNotification(req, res) {
    try {
      let commit = {};
      const { head_commit } = req.body;
      commit.description = head_commit.message;
      commit.dateCreation = head_commit.timestamp;
      commit.author = head_commit.author.username;
      const commitSaved = await WebhookUserService.saveCommitNotification(
        commit
      );

      res.status(201).json({
        status: "SUCCESS",
        message: "Notificación creada correctamente",
        data: commitSaved,
      });
    } catch (error) {
      res.status(500).json({
        status: "ERROR",
        message: "Error al intentar guardar el commit",
        details: error,
      });
    }
  }
}
module.exports = WebhookUserController;
