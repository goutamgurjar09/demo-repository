const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    }

})

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;