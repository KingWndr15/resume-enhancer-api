const cloudinary = require('cloudinary').v2
const config = require('../../utils/config.js')

/**
 * Configures the Cloudinary SDK with the necessary credentials.
 *
 * @param {Object} config - The configuration object containing Cloudinary credentials.
 * @param {string} config.CLOUDINARY_CLOUD_NAME - The Cloudinary cloud name.
 * @param {string} config.CLOUDINARY_API_KEY - The Cloudinary API key.
 * @param {string} config.CLOUDINARY_API_SECRET - The Cloudinary API secret.
 */

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary }