// const mongoose = require('mongoose');

// const resultSchema = new mongoose.Schema({
//  result:{
//       type: String,
//       trim: true,
//       enum:  ['PASS', 'FAIL', 'On Hold', 'Didn`t Attempt'] ,
//       required: true
//  },
//  student:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Student',
//     required: true
//  },
//  batch: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Batch',
//     required: true
//  },
//  interview: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Interview',
//     required: true
//  }

 
// })

// const Result = mongoose.model('Result', resultSchema);

// module.exports = Result

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
 result:{
      type: String,
      trim: true,
      enum:  ['PASS', 'FAIL', 'On Hold', 'Didn`t Attempt'] ,
      required: true
 },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  interview: { type: Schema.Types.ObjectId, ref: 'Interview', required: true },
  batch: { type: Schema.Types.ObjectId, ref: 'Batch', required: true } 
} , { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;

