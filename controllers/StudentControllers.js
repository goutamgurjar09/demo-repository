const Student = require('../models/Student');
const CourseScore = require('../models/CourseScore');
const Batch = require('../models/Batch');

exports.Students = async (req, res) => {
    try {
        const batches = await Batch.find(); // Retrieve all batches
        res.render('students/add', { batches }); // Pass batches to the view
    } catch (error) {
        res.status(500).send('Error retrieving batches');
    }
}

exports.createStudents = async (req, res) => {
    try {
        const { name, college, status, batchId, dsaScore, webdScore, reactScore } = req.body;

        // Validation
        if (!name || !college || !status || !batchId || !dsaScore || !webdScore || !reactScore) {
            return res.status(400).send('All fields are required');
        }

        const batch = await Batch.findById(batchId);
        if (!batch) {
            return res.status(400).send('Invalid batch ID');
        }

        // Create a new student
        const student = new Student({
            name,
            college,
            status,
            batch: batchId
        });

        await student.save();

        // Create course scores and associate with the student
        const courseScore = new CourseScore({
            dsaScore,
            webdScore,
            reactScore,
            student: student._id
        });

        await courseScore.save();

        student.courseScores = courseScore._id;
        await student.save();

        // Redirect to the students page
        res.status(201).redirect('/getstudent');
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).send('Error adding student');
    }
};

exports.getStudents = async (req, res) => {
    try {
        // Fetch all students with their associated batch and course scores
        const students = await Student.find()
            .populate('batch')
            .populate('courseScores');

        // Render the view with the student data
        res.render('students/Student', { students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Error fetching students');
    }
};
