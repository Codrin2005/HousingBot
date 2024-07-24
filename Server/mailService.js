function sendMails(body){
    Email.send({
        Host: "smtp.gmail.com",
        Username: "rcodrin13@gmail.com",
        Password: "pykj ixbb mtms wovw",
        To: 'rcodrin13@gmail.com',
        From: "rcodrin13@gmail.com",
        Subject: "Sending Email using JavaScript",
        Body: "This is a test email sent using JavaScript!",
    })
}

module.exports = {
    sendMails: sendMails
};

if (require.main === module) {
    const args = process.argv.slice(2); // Get command-line arguments
    sendMails(args[0]);         // Pass arguments to the method
}