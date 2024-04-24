const {  GoogleGenerativeAI } = require('@google/generative-ai')
const config = require('../../utils/config.js')

/**
 * Initializes a GoogleGenerativeAI instance with the "gemini-pro" model and returns it.
 * @returns {GoogleGenerativeAI} The initialized GoogleGenerativeAI instance.
 */
const genAI = new GoogleGenerativeAI(config.GOOGLE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

module.exports = model