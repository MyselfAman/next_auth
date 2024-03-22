import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  }
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(token:string, email:string) {
  // send mail with defined transport object

  const info = await transporter.sendMail({
    from: 'amankrsingh@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Verify Token", // Subject line
    text: `${process.env.DOMAIN}/verifyToken?token=${token}`, // plain text body
    html: `<p>Click the link below to verify your token:</p><p><a href="${process.env.DOMAIN}/verifyToken?token=${token}">Verify Token</a></p>`// html body
  });

  console.log("Message sent: %s", info.messageId);
  return info
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
