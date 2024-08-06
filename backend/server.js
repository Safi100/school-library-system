const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: '*',
    credentials: true,
}));

// conntect the database
const DB_URL = process.env.DATABASE
mongoose.connect(DB_URL)
.then(() => console.log('Database connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// routes
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const categoryRoutes = require('./routes/category.route');
const studentRoutes = require('./routes/student.route');

app.use('/api/user/', userRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/category/', categoryRoutes);
app.use('/api/student/', studentRoutes);

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