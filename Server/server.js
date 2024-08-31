require('dotenv').config({ path: './Server/server.env' });

const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_KEY);

app.use(express.json());
app.use(cors({
    origin: 'null'
}));

const fs = require('fs');

let users = [];

app.put('/api/add-user', (req, res) => {
    const user = req.body;
    users.push(user);
    fs.writeFile('./Server/userList.txt', JSON.stringify(users), (err) => {
        if (err) {
            console.log('Error writing to file: ' + err);
            res.status(500).json({error: 'Could not save user'});
        }
        console.log("The following user has been added to the file: \n" + JSON.stringify(user));
    })
    res.status(200).json({ message: 'User has been saved successfully'});
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

app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ error: 'An internal server error occurred' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    fs.readFile('./Server/userList.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            users = [];
        } else {
            try {
                users = JSON.parse(data);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                users = [];
            }
        }
    });
});
