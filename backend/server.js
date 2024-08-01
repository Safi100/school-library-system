const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('dev'));

// conntect the database
const DB_URL = process.env.DATABASE
mongoose.connect(DB_URL)
.then(() => console.log('Database connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = process.env.PORT 
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})