const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
 student:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
 },
 Interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview'
 },
 result:{
    type: String,
    trim: true,
    enum:  ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'] 
 }
 
})

const Result = mongoose.model('Result', resultSchema);

module.exports = Result