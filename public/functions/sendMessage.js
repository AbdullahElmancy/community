const nodemailer = require("nodemailer");
const sendMessage = async(message,email)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAILSEND,
          pass: process.env.PASSWORD,
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
  
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Abdalluh Elmancy" <process.env.EMAILSEND>', // sender address
          to: email, // list of receivers
          subject: "Confirmed account", // Subject line
          text: "click the link to verify your acount", // plain text body
          html: message
        });
}
module.exports = sendMessage