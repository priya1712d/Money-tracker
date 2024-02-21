const express = require('express');
const cors = require('cors')
require('dotenv').config();
const transaction = require('./models/Transaction.js')
const mongoose = require('mongoose');

const app = express();

app.use(cors())
app.use(express.json())
app.get('/api/test', (req, res) => {
 res.json('test ok')
});


app.post('/api/transaction', async (req,res) => {
   const { name, price, description, datetime} = req.body;
   await mongoose.connect(process.env.MONGO_URL);
   const trans = await transaction.create({name, price, description, datetime});
   res.json(trans);
});

app.get('/api/transactions', async (req,res) =>{
    await mongoose.connect(process.env.MONGO_URL);
    const trans = await transaction.find();
    res.json(trans);
});

app.listen(4000);