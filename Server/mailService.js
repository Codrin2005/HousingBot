function sendMails(body){
    console.log("bau: "+body);
}

module.exports = {
    sendMails: sendMails
};

if (require.main === module) {
    const args = process.argv.slice(2); // Get command-line arguments
    sendMails(args[0]);         // Pass arguments to the method
}