const globalConstants = require("../config/globalConstantsconfig");
const pug = require("pug");
const transporter = require("../config/mailer.config");
const { htmlToText } = require("html-to-text");

const sendWelcomeMail = (data) => {
  const html = pug.renderFile(`${__dirname}/templates/welcomeMailTemplate.pug`, data);
  transporter
    .sendMail({
      from: globalConstants.MAIL_USER,
      to: data.email,
      subject: "Bienvenido a Mi Catalogo Virtual",
      text: htmlToText(html),
      html,
    })
    .then(() => console.log("message sent"))
    .catch((error) => console.error(error));
};

module.exports = sendWelcomeMail;
