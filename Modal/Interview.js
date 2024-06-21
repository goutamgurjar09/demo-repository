const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'}
    ]
    // students: [{
    //     student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    //     result: { type: String, enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'] }
    // }]
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;