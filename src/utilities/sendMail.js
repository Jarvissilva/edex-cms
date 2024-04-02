import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_HOST_MAIL,
      pass: process.env.GMAIL_HOST_PASSWORD,
    },
  });
  return transporter.sendMail({
    from: process.env.GMAIL_HOST_MAIL,
    to,
    subject,
    html,
  });
};

export default sendMail;
