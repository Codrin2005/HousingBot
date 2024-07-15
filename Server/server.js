const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const fs = require('fs');


app.put('/api/email', (req, res) => {
    const mail = req.body.data;
    console.log(typeof mail);
    console.log(req.body);
    fs.writeFile('./Server/emailList.txt', String(mail), (err) => {
        if (err) throw err;
        console.log('Email has been written to emailList.txt');
    });
    res.status(200).json({ message: 'Email has been written successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
