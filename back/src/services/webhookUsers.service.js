const https = require("https");

const WEBHOOK_ID = "1141429995038847127";
const WEBHOOK_TOKEN =
  "Jznb5nmJ_LjwFxhvQzYwQQG_t1b1QR7kvEtax3tgbpwpYCPXegXuQYn_nIBOrpKMBgI_";

// const user = {
//   name: "Juan",
//   lastname: "Perez",
// };

module.exports = {
  createUserNotification: async (user) => {
    try {
      // Construir el mensaje a enviar a Discord
      console.log(user.name, user.lastname);
      const message = `Nuevo usuario registrado:\nNombre: ${user.name}\nApellido: ${user.lastname}`;

      // Configurar los detalles de la solicitud HTTP a Discord
      const options = {
        hostname: "discord.com",
        port: 443,
        path: `/api/webhooks/${WEBHOOK_ID}/${WEBHOOK_TOKEN}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Realizar la solicitud HTTP a Discord
      const reqToDiscord = https.request(options, (resFromDiscord) => {
        console.log(`Status code: ${resFromDiscord.statusCode}`);
      });

      reqToDiscord.on("error", (error) => {
        throw new Error(
          "No se pudo enviar la notificación, error en la comunicación con discord"
        );
      });

      // Enviar el mensaje al webhook de Discord
      reqToDiscord.write(JSON.stringify({ content: message }));
      reqToDiscord.end();
      return;
    } catch (error) {
      throw new Error(error);
    }
  },
};
