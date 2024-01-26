const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const saleRoutes = require('./routes/sale');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/sale', saleRoutes);

mongoose.connect('mongodb+srv://pooja1012:W2Ib3q9m5SHpXcWR@cluster0.ppwwi.mongodb.net/authsalesdata', { useNewUrlParser: true, useUnifiedTopology: true });


// API endpoint to save salesdata


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
