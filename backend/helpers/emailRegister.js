import nodemailer from "nodemailer";
import dotenv from "dotenv";

const emailRegister = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
  });

  transport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  console.log(datos);

  const { email, name, token } = datos;

  //SEND EMAIL
  try {
    const info = await transport.sendMail({
      from: '"VPA - Veterinary Patient Administrator" <no-reply@tudominio.com>',
      to: email,
      subject: "Check your account on PVA",
      text: "Check your account on PVA",
      html: `<p>Hi ${name}! check your account on PVA. </p>
                  <p>Your account is almost ready; you just need to verify the following link:
                  <a href='http://localhost:5173/verify/${token}'>Verify account</a> </p>
                  <p>If you haven't created this account, ignore this message</p>
          `,
    });

    console.log(`message sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

export default emailRegister;

// host: process.env.HOST_EMAIL,
// port: process.env.PORT_EMAIL,
// auth: {
//   user: process.env.USER_EMAIL,
//   pass: process.env.PASS_EMAIL
