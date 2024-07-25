const nodemailer = require('nodemailer');
const fs = require('fs').promises;

async function readFile() {
    let a = [];
    let contor = 0;
    const file = await fs.open('./Server/emailListDummy.txt');
    for await (const line of file.readLines()) {
        a[contor++] = line;
    }
    return a;
}

async function sendMails(body){
    let receivers = await readFile();
    
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "rcodrin13@gmail.com", // your email
            pass: "pykj ixbb mtms wovw", // your email password
        },
    });

    // Setup email data
    let mailOptions = {
        from: '"HousingBot" <rcodrin13@gmail.com>', // sender address
        to: receivers, // list of receivers
        subject: "Test", // Subject line
        text: body, // plain text body
    };

    for (let i = 0; i<receivers.length; i++){
        mailOptions.to = receivers[i];
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    }

}

module.exports = {
    sendMails: sendMails
};

if (require.main === module) {
    const args = process.argv.slice(2); // Get command-line arguments
    sendMails(args[0]);         // Pass arguments to the method
}