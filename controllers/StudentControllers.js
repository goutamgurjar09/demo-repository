
const StudentModal = require('../Modal/StudentModel');
const CourseScoresModel = require('../Modal/CourseScores');
const BatchModel = require('../Modal/Batch');
// exports.createStudents = async (req, res) => {
//     try {
//         const {name , college, status,batch, dsaFinalScore, webDFinalScore, reactFinalScore} = req.body;
//          // Create a new CourseScores object
//          const newCourseScores = new CourseScoresModel({
//             dsaFinalScore,
//             webDFinalScore,
//             reactFinalScore
//          })
//          await newCourseScores.save();
//          const newStudent = new StudentModal({
//             name,
//             college,
//             status,
//             batchid:batch,
//             courseScores: newCourseScores._id
//          })
//          await newStudent.save();

//         // Redirect to the /students route after successful save
//         res.redirect('/students');
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//         console.log(error);
//     }
// };

// exports.getStudents = async (req, res) => {
//     try {
//         const students = await StudentModal.find().populate('batchid').populate('courseScores');
//         res.render('./students/showStudents', { students });
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//         console.log(error);
//     }
// };


//Fetch the batches and pass them to the form view.

exports.showAddStudentForm = async (req, res) => {
    try {
        const batches = await BatchModel.find();
        res.render('students/add', { batches });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.createStudents = async (req, res) => {
    try {
        const { name, college, status, batchId, dsaFinalScore, webDFinalScore, reactFinalScore } = req.body;

        // Create a new CourseScores object
        const newCourseScores = new CourseScoresModel({
            dsaFinalScore,
            webDFinalScore,
            reactFinalScore
        });
        await newCourseScores.save();

        // Create a new student with courseScores referencing the new CourseScores object
        const newStudent = new StudentModal({
            name,
            college,
            status,
            batch: batchId, // Single batch reference
            courseScores: newCourseScores._id
        });
        await newStudent.save();

        // Redirect to the /students route after successful save
        res.redirect('/students');
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.log(error);
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await StudentModal.find().populate('batch').populate('courseScores');
        res.render('students/showStudents', { students });
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.log(error);
    }
};
