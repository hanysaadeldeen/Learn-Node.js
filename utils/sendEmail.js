const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = {
    from: `saaddeenhany@gmail.com`,
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(info);
};

module.exports = sendEmail;
