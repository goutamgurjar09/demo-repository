// const express = require('express');
// const router = express.Router();
// const studentController = require('../controllers/StudentControllers');


// //create new form in add.ejs and show it
// router.post('/students/addStudents', studentController.createStudents);

// router.get('/students', studentController.getStudents);

// module.exports = router;

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentControllers');

// // Route to handle the form submission and add a new student
// router.post('/students', studentController.createStudents);

// // Route to display all students
// router.get('/students', studentController.getStudents);




// Route to show the form for adding a new student
router.get('/students/create', studentController.showAddStudentForm);

// Route to handle form submission for creating a new student
router.post('/students/create', studentController.createStudents);

// Route to get all students
router.get('/students', studentController.getStudents);

module.exports = router;
