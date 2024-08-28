const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_KEY);

app.use(express.json());
app.use(cors());

const fs = require('fs');

require('dotenv').config({ path: './Server/server.env' });

app.put('/api/email', (req, res) => {
    const mail = req.body.data;
    fs.appendFile('./Server/emailList.txt', String(mail) + '\n', (err) => {
        if (err) throw err;
        console.log('"' + String(mail) + '" has been written to emailList.txt');
    });
    res.status(200).json({ message: 'Email has been written successfully' });
});

app.post('/api/create-stripe-payment', async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'ideal'],
            mode: 'payment',
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_FAIL_URL,
            line_items: [
                {
                  price: process.env.STRIPE_PRICE_ID,
                  quantity: 1,
                }
              ]
        })
        console.log('bau');
        res.json({message: session.url});
    }
    catch(e){
        console.log(e.message);
        res.status(500).json({error: e.message});
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
