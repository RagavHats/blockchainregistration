const nodemailer = require("nodemailer");
require('dotenv').config();

let sendMail = (to, subject, html) => {
  return new Promise((resolve, reject) => {
    const mode = process.env.NODE_ENV || 'dev';

    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port:process.env.PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_ID,
      to: to,
      subject: subject,
      html: html,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject("There is error in mail:- " + error);
      } else {
        console.log("Mail has been sent to", to)
        resolve("Mail Sent!!!");
      }
    });
  })
};

module.exports = {
  sendMail
}