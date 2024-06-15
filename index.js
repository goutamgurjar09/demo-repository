const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const studentRoutes = require('./routes/studentRoutes');
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
    res.send('Welcome to Career Camp Application');
});

//Route To Add new Students Data
app.get('/students/addStudent', (req, res) => {
    res.render('students/add');
});

// app.use('/student', studentRoutes);
app.use('/', studentRoutes);  //type /students to see the all data


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




















//when we go this route then it will create a new student in our database and show the data  as responce
// const StudentModal = require('./Modal/StudentModel');
// app.get('/students',  async(req, res) => {
//    try {
//     const addData = new StudentModal({
//         name: 'Ankita',
//         roll: 153,
//         marks: 100,
//         city: 'rau' 
//     })
//     await addData.save();
//     res.status(200).send({ message: "Data added successfully", data: addData });
//    }
//    catch (error) {
//     console.log(error , "error occured");
//     res.status(500).send({ message: "An error occurred", error });
//    }
// });
