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


/**
 * Finds a resume in the database by the given resume ID.
 * @param {string} resumeId - The ID of the resume to find.
 * @returns {Promise<Object>} - The found resume document.
 */
async function findResume(resumeId) {
  try {
    return await Resume.findById({ _id: resumeId });
  } catch (err) {
    throw err;
  }
}

/**
 * Deletes a resume from the database by the given resume ID.
 * @param {string} resumeId - The ID of the resume to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
async function deleteResume(resumeId) {
  try {
    return await Resume.deleteOne({ _id: resumeId });
  } catch (err) {
    throw err;
  }
}

/**
 * Provides an interface for managing resume-related data in the application.
 * @module resume-enhancement/repository
 */

const respository = {
  create,
  findResume,
  deleteResume,
};

module.exports = respository