const Discord = require("discord.js");
const CommitService = require("./commits.service");

const {
  WEBHOOK_ID,
  WEBHOOK_TOKEN,
} = require("../config/globalConstantsconfig.js");

class WebhookUserService {
  static async createUserNotification(user) {
    try {
      // Build the message to send to Discord
      const message = `Nuevo usuario registrado:\nNombre: ${user.name}\nApellido: ${user.lastname}`;

      // create an instance of the webhook and send the message
      const webhookDiscord = new Discord.WebhookClient({
        id: WEBHOOK_ID,
        token: WEBHOOK_TOKEN,
      });
      webhookDiscord.send(message);

      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async saveCommitNotification(commit) {
    try {
      const commitSaved = CommitService.postCommit(commit);
      return commitSaved;
    } catch (error) {
      throw new Error("error al intentar guardar el commit");
    }
  }
}

module.exports = WebhookUserService;
