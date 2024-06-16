const Interview = require('../Models/Interview');
const Student=require('../Models/Student')
const Result=require('../Models/Result')
const CourseScore = require('../models/CourseScore');

async function determineResult(studentId) {
    try {
        const student = await Student.findById(studentId).populate('courseScores');
        if (!student) {
            throw new Error('Student not found');
        }

        const { dsaScore, webdScore, reactScore } = student.courseScores;

        // Example logic to determine result
        let result = 'On Hold';
        if (dsaScore >= 60 && webdScore >= 60 && reactScore >= 60) {
            result = 'PASS';
        } else {
            result = 'FAIL';
        }

        return result;
    } catch (error) {
        throw new Error(`Error determining result: ${error.message}`);
    }
}
exports.getInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.render('students/interviewlist', { interviews });
    } catch (error) {
        console.error('Error fetching interviews:', error);
        res.status(500).send('Error fetching interviews');
    }
};

exports.createInterviewForm = (req, res) => {
    res.render('students/interviewcreate');
};

exports.createInterview = async (req, res) => {
    const { companyName, date } = req.body;
    console.log("create interview call ho rha eh ")
    try {
        const interview = new Interview({ companyName, date });
        await interview.save();
        res.redirect('/interviewlist');
    } catch (error) {
        console.error('Error creating interview:', error);
        res.status(500).send('Error creating interview');
    }
};

exports.getInterviewDetails = async (req, res) => {
    const interviewId = req.params.id;
    try {
        const interview = await Interview.findById(interviewId).populate('students');
        if (!interview) {
            return res.status(404).send('Interview not found');
        }
        const students = await Student.find()
        .populate('batch')
        .populate('courseScores');
        res.render('students/interviewdetails', { interview ,students});
    } catch (error) {
        console.error('Error fetching interview details:', error);
        res.status(500).send('Error fetching interview details');
    }
};
exports.allocateStudent = async (req, res) => {
    const interviewId = req.params.id;
    const studentId = req.body.studentId;

    try {
        // Find the interview
        const interview = await Interview.findById(interviewId);
        if (!interview) {
            return res.status(404).send('Interview not found');
        }

        // Check if student is already allocated to this interview
        const isAllocated = interview.students.some(student => student.equals(studentId));
        if (isAllocated) {
            return res.status(400).send('Student is already allocated to this interview');
        }

        // Calculate result
        const result = await determineResult(studentId);

        // Save result to Result collection
        const newResult = new Result({
            result,
            student: studentId,
            interview: interviewId
        });
        await newResult.save();

        // Update interview's students array
        interview.students.push(studentId);
        await interview.save();

        res.sendStatus(200); // Success response
    } catch (error) {
        console.error('Error allocating student:', error);
        res.status(500).send('Error allocating student');
    }
};

// exports.allocateStudent = async (req, res) => {
//     const interviewId = req.params.id;
//     const studentId = req.body.studentId;
//     try {
//         const interview = await Interview.findById(interviewId);
//         if (!interview) {
//             return res.status(404).send('Interview not found');
//         }
//         const isAllocated = interview.students.some(student => student.equals(studentId));
//         if (isAllocated) {
//             return res.status(400).send('Student is already allocated to this interview');
//         }
        
//         interview.students.push(studentId);
//         await interview.save();
//         res.sendStatus(200); // Success response
//     } catch (error) {
//         console.error('Error allocating student:', error);
//         res.status(500).send('Error allocating student');
//     }
// };

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
        .populate('batch')
        .populate('courseScores');
        res.render('students/allstudents', { students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Error fetching students');
    }
};
exports.showStudentResults = async (req, res) => {
    const studentId = req.params.id;

    try {
        const student = await Student.findById(studentId).populate('batch');
        if (!student) {
            return res.status(404).send('Student not found');
        }

        const results = await Result.find({ student: studentId }).populate('interview');

        res.render('students/results', { student, results }); // Render results.ejs with student and results data
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).send('Error fetching results');
    }
};