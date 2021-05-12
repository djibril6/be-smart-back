const nodemailer = require('nodemailer');

const sendMail = async (destination, subject, text) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
    });
      
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <issoufoudjib@gmail.com>', // sender address
        to: destination, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: "<b>Your password: </b>" + text, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendMail;