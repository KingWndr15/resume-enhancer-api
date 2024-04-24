const mongoose = require("mongoose");
const { Schema } = mongoose;


const enhancedResumeSchema = new Schema({
    resume_url: String
}, { timestamps: true, autoIndex: false})

const Resume = mongoose.model('Resume', enhancedResumeSchema)
module.exports = Resume
