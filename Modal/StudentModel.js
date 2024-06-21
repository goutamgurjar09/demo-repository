
// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     college: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['placed', 'not_placed'],
//         default: 'unplaced'
//     },
//     batches: [    {bcz of one to many relationship}
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Batch'
//     }],
//     courseScores: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'CourseScores'
//     },
//     result: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Result'
//     }
// }, { timestamps: true });

// const Student = mongoose.model('Student', studentSchema);
// module.exports = Student;



const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    college: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ['placed', 'not_placed'],
        default: 'not_placed'
    },
    // batch: {  // Change to a single batch reference
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Batch'
    // },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    courseScores: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseScores'
    },
  
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
