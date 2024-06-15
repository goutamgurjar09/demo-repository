
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // name: String,
    // college: String,
    // status: {
    //     type: String,
    //     enum: ['placed', 'not_placed'],
    //     default: 'unplaced'
    // },
    // dsaFinalScore: Number,
    // webDFinalScore: Number,
    // reactFinalScore: Number
    name:{
        type:String,
        trim:true,
        required:true
    },
    college:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:String,
        enum:['placed','not_placed'],
        default:'unplaced'
    },
    dsaFinalScore:{
        type:Number
    },
    webDFinalScore:{
        type:Number
    },
    reactFinalScore:{
        type:Number
    },
    // batch:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Batch'
    // }
})

const Student = mongoose.model('Student', studentSchema);
module.exports  = Student;