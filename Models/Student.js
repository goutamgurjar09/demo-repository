const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required: true },
    college: { type: String, required: true },
    status: { type: String, enum: ['placed', 'not_placed'], required: true },
    batch: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
    courseScores: { type: Schema.Types.ObjectId, ref: 'CourseScore' }
});

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
