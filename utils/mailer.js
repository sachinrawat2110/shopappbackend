// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_UNAME,
    pass: process.env.SMTP_PASS
  },
});

const sendMail = async (mailOptions) => 
{
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, response: info.response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendMail };
