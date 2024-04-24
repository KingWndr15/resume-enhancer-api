const multer = require('multer')
const storage = multer.memoryStorage()


/**
 * Middleware function to handle file size limit errors.
 *
 * This middleware function is used to handle errors that occur when the uploaded file size exceeds the maximum limit. If the error code is "LIMIT_FILE_SIZE", it returns a 400 Bad Request response with a JSON payload indicating the error. Otherwise, it calls the next middleware function.
 *
 * @param {Error} err - The error object containing information about the file size limit error.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function to be called.
 */
async function handlefileSizeLimitError(err, req, res, next) {
  try {
    if (err.code === "LIMIT_FILE_SIZE")
      return res.status(400).json({
        success: false,
        message: "File size exceeds the maximum limit",
      });
    next();
  } catch (err) {
    next(err);
  }
}


/**
 * Configures the Multer middleware for file uploads.
 *
 * This middleware is responsible for handling file uploads using the Multer library.
 * It sets up the storage configuration, file filter, and size limit for the uploaded files.
 *
 * The uploaded files will be stored using the configured storage settings, and the
 * `fileFilter` function will be used to validate the file type. The size limit is
 * set to 5MB.
 */

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { upload, handlefileSizeLimitError }