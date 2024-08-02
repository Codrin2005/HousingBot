const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const stripe = require('stripe')('sk_test_51PgvX4RpDrfOWwfbODoSMZL7pztuzOSLZsrCp8oMRtvMxjoZypFRtqfBNZXmDwuPFNvPSy1fFcy0kJHv8Doy6zMB00OMmBdlbP');

app.use(express.json());
app.use(cors());

const fs = require('fs');


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
            success_url: 'https://github.com/Codrin2005/HousingBot',
            cancel_url: 'https://www.example.com',
            line_items: [
                {
                  // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                  price: 'price_1PhTO6RpDrfOWwfbFgLCUvU7',
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
