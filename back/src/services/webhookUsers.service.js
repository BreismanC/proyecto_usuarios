const Discord = require("discord.js");
const {
  WEBHOOK_ID,
  WEBHOOK_TOKEN,
} = require("../config/globalConstantsconfig.js");

module.exports = {
  createUserNotification: async (user) => {
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
  },
};
