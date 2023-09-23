import nodemailer from "nodemailer";
import dotenv from "dotenv";

const recoverPassword = async (datos) => {
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
      from: "VPA - Veterinary Patient Administrator",
      to: email,
      subject: "Recover your password!",
      text: "Recover your password!",
      html: `<p>Hi ${name}! You have requested to reset your password. </p>
                  <p>Follow the next link to generate a new password:
                  <a href='http://localhost:5173/forgot-password/${token}'>Recover account</a> </p>
          `,
    });

    console.log(`message sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

export default recoverPassword;
