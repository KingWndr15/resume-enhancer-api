const express = require('express')
const enhancement = express.Router()
const { enhanceResume } = require('./controller')
const { handlefileSizeLimitError, upload} = require('../../middlewares/upload')

enhancement.post(
  "/upload",
  upload.single('resume'),
  handlefileSizeLimitError,
  enhanceResume
);

module.exports = enhancement

