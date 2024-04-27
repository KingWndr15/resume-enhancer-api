const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Mongoose schema and model for an "Enhanced Resume" document.
 *
 * The "Enhanced Resume" document has the following fields:
 * - `resume_url`: The URL of the resume document, required.
 *
 * The document also has automatic timestamps for `createdAt` and `updatedAt`.
 */
const enhancedResumeSchema = new Schema(
  {
    resume_url: { type: String, required: true }
  },
  { timestamps: true, autoIndex: false }
);

const Resume = mongoose.model("Resume", enhancedResumeSchema);
module.exports = Resume;
