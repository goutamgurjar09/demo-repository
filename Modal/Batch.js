const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

const Batch = mongoose.model('Batch', batchSchema)

module.exports = Batch;