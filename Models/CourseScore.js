// models/CourseScore.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseScoreSchema = new Schema({
    dsaScore: { type: Number, required: true },
    webdScore: { type: Number, required: true },
    reactScore: { type: Number, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true }
});

module.exports = mongoose.models.CourseScore || mongoose.model('CourseScore', courseScoreSchema);
