const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.route');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// conntect the database
const DB_URL = process.env.DATABASE
mongoose.connect(DB_URL)
.then(() => console.log('Database connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// routes
app.use('/api/auth/', authRoutes);

app.use((err, req, res, next) => {
    if(!err.message) err.message = 'Internal Server Error'
    const {statusCode = 500 } = err
    console.log(err.message);
    res.status(statusCode).json(err.message)
})

const port = process.env.PORT 
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})