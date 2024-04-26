const mongoose = require('mongoose')
const config = require('./config.js');
const logger = require('./logger.js');

/**
 * Establishes a connection to the database using the configured database URL.
 *
 * @async
 * @function establishDatabaseConnection
 * @returns {Promise<void>} - Resolves when the database connection is established successfully, or rejects with an error if the connection fails.
 */
async function establishDatabaseConnection() {
  try {
    await mongoose.connect(config.DATABASE_URL);
    logger.info("Database connection established successfully");
  } catch (err) {
    logger.error("Error connecting to database", err);
  }
}

module.exports = establishDatabaseConnection