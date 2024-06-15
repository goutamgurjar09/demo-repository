// const StudentModal = require('../Modal/StudentModel');


// exports.createStudents = async (req, res) => {
//     try{
//         //console.log("studentData: ",req.body);
//         const newStudent = new StudentModal(req.body);
//         await newStudent.save();
//         res.status(200).send({ message:'Data added successfully', data: newStudent });
//         res.render('showStudents',{newStudent});
//     }
//     catch(error){
//         res.status(400).send({ message: error.message });
//         console.log(error);
//     }
// }
// exports.getStudents = async (req , res)=>{
//     try{
//         const students = await StudentModal.find();
//         res.status(200).send({message:'Data fetched successfully', data: students});
//         res.render('showStudents',{students});
//     }
//     catch(error){
//         res.status(400).send({ message: error.message });
//         console.log(error);
//     }
// }


// const StudentModal = require('../Modal/StudentModel');

// exports.createStudents = async (req, res) => {
//     try {
//         // console.log(req.body)
//         const newStudent = new StudentModal(req.body);
//         await newStudent.save();
//         res.status(200).send({ message: 'Data added successfully', data: newStudent });
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//         console.log(error);
//     }
// };

// exports.getStudents = async (req, res) => {
//     try {
//         const students = await StudentModal.find();
//        // console.log(students);
//         res.render('showStudents', { students });
//        // res.redirect('/students');
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//         console.log(error);
//     }
// };



const StudentModal = require('../Modal/StudentModel');

exports.createStudents = async (req, res) => {
    try {
        const newStudent = new StudentModal(req.body);
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
        const students = await StudentModal.find();
        res.render('./students/showStudents', { students });
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.log(error);
    }
};
