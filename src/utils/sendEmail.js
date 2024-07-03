// module
import nodemailer from 'nodemailer'

// function send email
export const sendEmail = async(email,otp)=>{ 
    const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "yousef01121977646@gmail.com",
      pass: "isrfnozeycygzjqx",
    },
  });

  const info = await transporter.sendMail({
    from: '"Saraha app" <yousef01121977646@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ", // Subject line
    text: "Welcome To Saraha app ", // plain text body
    html: `<p>Your otp is ${otp}</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
