const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/InterviewController');



// // GET all interviews
// router.get('/interviews', interviewController.getAllInterviews);

// // GET request to show the form for creating an interview
// router.get('/interviews/create', interviewController.getCreateInterviewForm);

// // POST request to handle form submission for creating an interview
// router.post('/interviews/create', interviewController.createInterview);

// // GET request to get details of a specific interview
//  router.get('/interviews/:id', interviewController.getInterviewDetail);


//post req. to allocate student for interview
// router.post('/interviews/:interviewId/allocate', interviewController.allocateStudents);


// // get request to get the result with student  of an interview
// router.get('/students/:id/results', interviewController.getStudentResult);




// GET all interviews
router.get('/interviews', interviewController.getAllInterviews);

// GET request to show the form for creating an interview
router.get('/interviews/create', interviewController.getCreateInterviewForm);

// POST request to handle form submission for creating an interview
router.post('/interviews/create', interviewController.createInterview);

// GET request to get details of a specific interview
router.get('/interviews/:id', interviewController.getInterviewDetail);

// POST request to allocate student for interview
router.post('/interviews/:interviewId/allocate', interviewController.allocateStudents);

// GET request to get the result of a student for an interview
router.get('/students/:id/results', interviewController.getStudentResult);

module.exports = router;



