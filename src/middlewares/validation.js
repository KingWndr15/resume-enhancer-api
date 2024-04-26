const Joi = require('joi')
/**
 * Middleware function to handle Joi validation errors.
 *
 * This middleware function is designed to catch Joi validation errors that occur
 * during the request processing pipeline. If a Joi validation error is
 * encountered, it will return a 400 Bad Request response with the error
 * details.
 *
 * @param {Error} err - The error object, which should be a Joi.ValidationError.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
async function errorHander(err, req, res, next) {
    try {
      if (err instanceof Joi.ValidationError)
        return res.status(400).json({
          success: false,
          message: "Bad request",
          errors: err.details[0].message,
        });
        next(err)
    } catch (err) {
      next(err);
    }
  }

module.exports = errorHander