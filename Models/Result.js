const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  result: { type: String, enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'], required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  interview: { type: Schema.Types.ObjectId, ref: 'Interview', required: true }
});

module.exports = mongoose.model('Result', resultSchema);
