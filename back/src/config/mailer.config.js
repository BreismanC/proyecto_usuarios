const nodemailer = require("nodemailer");
const globalConstants = require("./globalConstantsconfig");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  tls: {
    rejectUnauthorized: false,
  },
  secure: true,
  auth: {
    user: globalConstants.MAIL_USER,
    pass: globalConstants.MAIL_PASSWORD,
  },
});

module.exports = transporter;
