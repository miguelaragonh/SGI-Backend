const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "sistemadeincidentes.ucr@gmail.com",
    pass: "qoez kxsv zdjr mlkl",
  },
});
/*
async function main() {
  const info = await transporter.sendMail({
    from: '"Sistema de Incidentes UCR" <sistemadeincidentes.ucr@gmail.com>', // sender address
    to: "luis.aragonduarte@ucr.ac.cr", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);*/

async function main(to, subject, text, html) {
    
    const info = await transporter.sendMail({
        from: '"Sistema de Incidentes UCR" <sistemadeincidentes.ucr@gmail.com>', 
        to, 
        subject, 
        text, 
        html, 
    });

    console.log("Message sent: %s", info.messageId);
    
}

module.exports = main;
