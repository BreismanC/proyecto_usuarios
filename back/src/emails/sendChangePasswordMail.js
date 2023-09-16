require("dotenv").config();
const pug = require("pug");
const transporter = require("./mailer");
const { htmlToText } = require("html-to-text");

const sendChangePasswordMail = (data) => {
  console.log(data);
  const html = pug.renderFile(`${__dirname}/templates/changePasswordTemplate.pug`, data);
  transporter
    .sendMail({
      from: process.env.MAIL_USER,
      to: data.email,
      subject: "Cambio de contraseña",
      text: htmlToText(html),
      html
      // html: `<h1>Hola ${data.firstName}</h1><b><p>Para cambiar de contraseña da click en el botón. </p> <button><a href="http://localhost:5173/change-password?token=${data.token}" > Cambiar contraseña </a></button>`
    })
    .then(() => console.log("message sent"))
    .catch((error) => console.error(error));
};

module.exports = sendChangePasswordMail;
