const Resume = require('./model')

/**
 * Creates a new resume in the database.
 *
 * @param {string} url - The URL of the resume to create.
 * @returns {Promise<Resume>} - The created resume.
 * @throws {Error} - If there is an error creating the resume.
 */
async function create(url) {
  try {
    return await Resume.create({ resume_url: url });
  } catch (err) {
    throw err;
  }
}

const respository = {
    create
}

module.exports = respository