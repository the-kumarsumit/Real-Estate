import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kingbrawler2227@gmail.com",
    pass: "numo ipdd rxkc peut",
  },
});

export default transporter;
