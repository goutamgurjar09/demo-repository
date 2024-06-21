const mongoose = require('mongoose');

const courseScoresSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
    },
    dsaFinalScore: {
        type: Number,
        required: true
    },
    webDFinalScore: {
        type: Number,
        required: true
    },
    reactFinalScore: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const CourseScores = mongoose.model('CourseScores', courseScoresSchema);
module.exports = CourseScores;
