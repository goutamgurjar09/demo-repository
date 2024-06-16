
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentControllers');
const Batchcontroller=require("../controllers/Batchcontroller");

// Route to handle the form submission and add a new studnt
router.get('/createStudent',studentController.Students)
router.post('/CreateStudent', studentController.createStudents);
router.post('/createbatch', Batchcontroller.createBatch);
router.get('/getstudent', studentController.getStudents);

// Route to display all students

module.exports = router;
