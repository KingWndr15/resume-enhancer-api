const express = require("express");
const enhancement = express.Router();
const {
  enhanceResume,
  previewResume,
  deleteResume,
  downloadResume,
} = require("./controller");
const {
  handlefileSizeLimitError,
  upload,
} = require("../../middlewares/upload");

/**
 * Uploads a resume file and enhances it.
 */
enhancement.post(
  "/upload",
  upload.single("resume"),
  handlefileSizeLimitError,
  enhanceResume
);

/**
 * Retrieves a preview of the specified resume.
 */
enhancement.get("/:resumeId", previewResume);

/**
 * Downloads a resume based on the provided resumeId.
 */
enhancement.get("/download/:resumeId", downloadResume);

/**
 * Deletes a resume by the given resumeId.
 */
enhancement.delete("/:resumeId", deleteResume);

module.exports = enhancement;
