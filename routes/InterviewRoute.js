const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/InterviewController');

router.get('/interviewlist', interviewController.getInterviews);
router.get('/create', interviewController.createInterviewForm);
router.post('/createInterview', interviewController.createInterview);
router.get('/interviews/:id', interviewController.getInterviewDetails);
router.post('/interviews/:id/allocate', interviewController.allocateStudent);
router.get('/students/:id/results', interviewController.showStudentResults);
module.exports = router;
