const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const studentRoutes = require('./routes/studentRoutes');
const interviewRoutes=require("./routes/InterviewRoute")
const path = require('path');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine for views directery
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set static folder  for public directery
app.use(express.static(path.join(__dirname, 'public')));

// DB connection
connectDB();

app.get('/', (req, res) => {
    res.render('students/landing');
});

//Route To Add new Students Data
app.get('/batch', (req, res) => {
    res.render('students/batch');
});

// app.use('/student', studentRoutes);
app.use('/',studentRoutes);  //type /students to see the all data
app.use('/',interviewRoutes);  //type /students to see the all data


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

