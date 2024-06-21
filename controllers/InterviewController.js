const mongoose = require('mongoose');
const Interview = require('../Modal/Interview')
const Student = require('../Modal/StudentModel')
const Result = require('../Modal/Result');
const ObjectId = mongoose.Types.ObjectId;



const determineResult = async (studentId) => {
  try {
    // Find the student and populate courseScores
    const student = await Student.findById(studentId).populate('courseScores');
    if (!student) {
      throw new Error('Student not found');
    }

    const { dsaFinalScore, webDFinalScore, reactFinalScore } = student.courseScores;
    const totalMarks = dsaFinalScore + webDFinalScore + reactFinalScore;
    const percentage = (totalMarks / 300) * 100;

    let result = 'On Hold';
    if (percentage >= 75) {
      result = 'PASS';
    } else if (percentage >= 60) {
      result = 'PASS';
    } else {
      result = 'FAIL';
    }
    return { result , percentage } 
  } 
  catch (error) {
    console.error('Error determining result:', error);
    throw error; // Throw error to handle it in calling function
  }
};

//To get all the interviews
exports.getAllInterviews = async (req, res) => {
  try {
      const interviews = await Interview.find();
      res.render('interview/interviewList', { interviews });
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};

//To show the form to create an interview
exports.getCreateInterviewForm = (req, res) => {
  res.render('interview/createInterview');
};

//To create an interview
exports.createInterview = async (req, res) => {
  try{
    const { companyName, date } = req.body;
    const interview = new Interview({ companyName, date });
    await interview.save();
    res.redirect('/interviews');
  }
  catch(error){
    res.status(500).send({ message: error.message });
  }
}

//to get details of a specific interview through id

exports.getInterviewDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id).populate({
      path: 'students',
      populate: { path: 'batch' }
    });  
    const students = await Student.find().populate('batch').populate('courseScores');

    if (!interview) {
      return res.status(404).send('Interview not found');
    }

    res.render('interview/getInterviewDetails', { interview, students });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


//to allocate students for an interview

// exports.allocateStudents = async (req, res) => {
//   try{
//     const interviewId = req.params.interviewId;   //the interviewId is from URL params
//     const {studentId } = req.body;
//     const interview = await Interview.findById(interviewId);
//     if (!interview) {
//       return res.status(404).send('Interview not found');
//     }
//     const student = await Student.findById(studentId);
//     if (!student) {
//       return res.status(404).send('Student not found');
//     }
//     // Check if the student is already allocated to the interview
//     if(interview.students.includes(student._id)){
//       return res.status(400).send('Student already allocated to this interview')
//     }
//     // Push only the student's ID to avoid embedding the whole student document      
//     // Add the student to the interview's students array

//     interview.students.push(student);
//     // Save the updated interview
//     await interview.save();
//     res.redirect(`/interviews/${interviewId}`);
//     res.status(200).json({ message: 'Student allocated to interview successfully' });
//   }
//   catch(error){
//     res.status(500).send({ message: error.message });
//     console.error('Error allocating student to interview:', error);
//   }
// }
//---------------------------------------------



// exports.allocateStudents = async (req, res) => {
//   try {
//     console.log('Request received:', req.body); // Log the request body
//     const { interviewId } = req.params;
//     const { studentId } = req.body;

//     const interview = await Interview.findById(interviewId);
//     if (!interview) {
//       console.log('Interview not found');
//       return res.status(404).send('Interview not found');
//     }
//     const student = await Student.findById(studentId);
//     if (!student) {
//       console.log('Student not found');
//       return res.status(404).send('Student not found');
//     }
    
//     if (interview.students.includes(student._id)) {
//       console.log('Student already allocated');
//       return res.status(400).send('Student already allocated to this interview');
//     }
    
//     // Add the student to the interview's students array
//     interview.students.push(student._id);
//     await interview.save();

//     console.log('Student allocated successfully');
//     res.redirect(`/interviews/${interviewId}`);
//   } catch (error) {
//     console.error('Error allocating student to interview:', error);
//     res.status(500).send({ message: error.message });
//   }
// };

// //----------------------------
// exports.allocateStudents = async (req, res) => {
//   const { interviewId } = req.params;
//   const { studentId } = req.body;

//   try {
//     // Check if the interview exists
//     const interview = await Interview.findById(interviewId);
//     if (!interview) {
//       console.log('Interview not found');
//       return res.status(404).send('Interview not found');
//     }

//     // Check if the student exists
//     const student = await Student.findById(studentId);
//     if (!student) {
//       console.log('Student not found');
//       return res.status(404).send('Student not found');
//     }

//     // Check if the student is already allocated to this interview
//     if (interview.students.includes(student._id)) {
//       console.log('Student already allocated to this interview');
//       return res.status(400).send('Student already allocated to this interview');
//     }

//     // Update the interview's students array
//     interview.students.push(student._id);
//     await interview.save();

//     // Respond with success status
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error allocating student to interview:', error);
//     res.status(500).send('Error allocating student to interview');
//   }
// };



exports.allocateStudents = async (req, res) => {
  const { interviewId } = req.params;
  const { studentId } = req.body;

  try {
    console.log('Allocating student:', studentId, 'to interview:', interviewId);

    // Check if the interview exists
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      console.log('Interview not found');
      return res.status(404).send('Interview not found');
    }

    console.log('Interview found:', interview);

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      console.log('Student not found');
      return res.status(404).send('Student not found');
    }

    console.log('Student found:', student);

    // Check if the student is already allocated to this interview
    if (interview.students.includes(student._id)) {
      console.log('Student already allocated to this interview');
      return res.status(400).send('Student already allocated to this interview');
    }

    // Calculate result
    const { result, percentage } = await determineResult(studentId);

    console.log('Result determined:', result, 'with percentage:', percentage);

    // Save result to Result collection
    const newResult = new Result({
      result,
      student: studentId,
      interview: interviewId,
      batch: student.batch // Student Modal has a batch field
    });

    await newResult.save();

    console.log('New result saved in results collection:', newResult);

    // Update interview's students array
    interview.students.push(studentId);
    await interview.save();

    console.log('Interview updated with new student:', interview);

    res.sendStatus(200); // Success response
  } catch (error) {
    console.error('Error allocating student:', error);
    res.status(500).send('Error allocating student');
  }
};


//----------------------------------




// exports.getStudentResult = async (req, res) => {
//   const studentId = req.params.id;

//   try {
//     const student = await Student.findById(studentId).populate('batch');
//     if (!student) {
//       return res.status(404).send('Student not found');
//     }

//     const results = await Result.find({ student: studentId }).populate('interview');

//     console.log('Student:', student);
//     console.log('Results:', results);

//     res.render('interview/getStudentResult', { student, results }); // Render getStudentResult.ejs with student and results data
//   } catch (error) {
//     console.error('Error fetching results:', error);
//     res.status(500).send('Error fetching results');
//   }
// };


//-----------------------------

exports.getStudentResult = async (req, res) => {
  const studentId = req.params.id;
  // const interviewId = req.params.interviewId;
  
  try {
    const student = await Student.findById(studentId).populate('batch');
    if (!student) {
      return res.status(404).send('Student not found');
    }

    console.log('Student found:', student);

    // Determine result for the student
    const { result , percentage } = await determineResult(studentId);

    console.log('Result determined:', result);

    // Fetch interview results for the student
    const results = await Result.find({ student: studentId }).populate('interview').exec();

    console.log('Interview Results:', results);

    // Render the EJS template with student, result, and results data
    res.render('interview/getStudentResult', { student, result, results , percentage});
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).send('Error fetching results');
  }
};











//------------------
//Tested Code

// Define determineResult function within the same controller
// const determineResult = async (studentId) => {
//   try {
//     // Find the student and populate courseScores
//     const student = await Student.findById(studentId).populate('courseScores');
//     if (!student) {
//       throw new Error('Student not found');
//     }

//     const { dsaFinalScore, webDFinalScore, reactFinalScore } = student.courseScores;
//     const totalMarks = dsaFinalScore + webDFinalScore + reactFinalScore;
//     const percentage = (totalMarks / 300) * 100;

//     let result = 'On Hold';
//     if (percentage >= 75) {
//       result = 'PASS';
//     } else if (percentage >= 60) {
//       result = 'PASS';
//     } else {
//       result = 'FAIL';
//     }

//     return result;
//   } catch (error) {
//     console.error('Error determining result:', error);
//     throw error; // Throw error to handle it in calling function
//   }
// };

// exports.getStudentResult = async (req, res) => {
//   const studentId = req.params.id;

//   try {
//     const student = await Student.findById(studentId).populate('batch').populate('courseScores');
//     if (!student) {
//       return res.status(404).send('Student not found');
//     }

//     // Calculate result
//     const result = await determineResult(studentId);

//     // Fetch existing results
//     const results = await Result.find({ student: studentId }).populate('interview');

//     console.log('Student:', student);
//     console.log('Results:', results);

//     res.render('interview/getStudentResult', { student, result, results }); // Pass result to the view
//   } catch (error) {
//     console.error('Error fetching results:', error);
//     res.status(500).send('Error fetching results');
//   }
// };



// exports.allocateStudents = async (req, res) => {
//   const { interviewId } = req.params; 
//   const { studentId } = req.body;

//   try {
//     console.log(`Finding interview with ID: ${interviewId}`);
//     const interview = await Interview.findById(interviewId);
//     if (!interview) {
//       console.log('Interview not found');
//       return res.status(404).send('Interview not found');
//     }

//     console.log(`Checking if student with ID: ${studentId} is already allocated`);
//     const isAllocated = interview.students.some(student => student.equals(studentId));
//     if (isAllocated) {
//       console.log('Student is already allocated to this interview');
//       return res.status(400).send('Student is already allocated to this interview');
//     }

//     console.log(`Determining result for student with ID: ${studentId}`);
//     const result = await determineResult(studentId);
//     console.log(`Determined result: ${result}`);

//     console.log('Saving new result');
//     const newResult = new Result({
//       result,
//       student: mongoose.Types.ObjectId(studentId),
//       interview: mongoose.Types.ObjectId(interviewId)
//     });
//     await newResult.save();
//     console.log('Result saved successfully');

//     console.log('Updating interview\'s students array');
//     interview.students.push(studentId);
//     await interview.save();
//     console.log('Interview updated successfully');

//     res.sendStatus(200); // Success response
//   } catch (error) {
//     console.error('Error allocating student:', error);
//     res.status(500).send('Error allocating student');
//   }
// };


//---------------------------------------------------------------------------------------

