const PDFParser = require("pdf-parse");
const removeMarkdown = require("markdown-to-text").default;
const axios = require("axios").default;
const { Readable } = require("stream");
const PDFDOCUMENT = require("pdfkit");
const model = require("../../services/ai/gemini");
const respository = require("./repository");
const { cloudinary } = require("../../services/upload/cloudinary");
const config = require("../../utils/config");
const resumeSchemaParam = require("./schema");
const errorHander = require("../../middlewares/validation");
const logger = require("../../utils/logger");

/**
 * Enhances a resume by generating an improved version based on the provided PDF file.
 *
 * @param {Object} req - The HTTP request object.
 * @param {File} req.file - The PDF file containing the resume to be enhanced.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} - A JSON response indicating the success or failure of the operation, and the URL of the enhanced resume.
 */
async function enhanceResume(req, res, next) {
  if (!req.file)
    return res.status(400).json({
      success: false,
      message: "Resume file required!",
    });

  if (req.file.mimetype !== "application/pdf")
    return res.status(415).json({
      success: false,
      message: "Invalid file format pdf file expected!",
    });

  try {
    const resumeBuffer = req.file.buffer;
    const parsedPdf = await PDFParser(resumeBuffer);
    const enhancedContent = await model.generateContent(
      config.GEMINI_PROMPT + parsedPdf.text
    );

    const resume = removeMarkdown(enhancedContent.response.text());
    const doc = new PDFDOCUMENT();
    doc.text(resume);

    const chunks = [];
    doc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      const pdfStream = new Readable();
      pdfStream.push(pdfBuffer);
      pdfStream.push(null);

      const cloudinaryUpload = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        async (error, result) => {
          if (error) {
            logger.error(`Error Uploading file to cloudinary: ${error}`);
          }
          const enhancedResume = await respository.create(result.secure_url);
          return res.status(201).json({
            success: true,
            message: "Resume enhanced successfully",
            data: {
              resume: enhancedResume,
            },
          });
        }
      );
      pdfStream.pipe(cloudinaryUpload);
    });
    doc.end();
  } catch (err) {
    errorHander(err, req, res, next);
  }
}

/**
 * Previews a resume by its ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.resumeId - The ID of the resume to preview.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A Promise that resolves when the resume preview is sent.
 */
async function previewResume(req, res, next) {
  try {
    const requestParam = await resumeSchemaParam.validateAsync(req.params);
    const resume = await respository.findResume(requestParam.resumeId);
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }
    return res.status(200).json({
      success: true,
      data: {
        resume: resume.resume_url,
      },
    });
  } catch (err) {
    errorHander(err, req, res, next);
  }
}

/**
 * Deletes a resume from the system.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.resumeId - The ID of the resume to delete.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} - A JSON response indicating the success or failure of the operation.
 */
async function deleteResume(req, res, next) {
  try {
    const requestParam = await resumeSchemaParam.validateAsync(req.params);
    const resume = await respository.deleteResume(requestParam.resumeId);
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (err) {
    errorHander(err, req, res, next);
  }
}

/**
 * Downloads a resume from a given URL and sends it as an attachment in the response.
 *
 * @param {Object} req - The Express request object.
 * @param {string} req.params.resumeId - The ID of the resume to download.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A Promise that resolves when the resume has been downloaded and sent in the response.
 */
async function downloadResume(req, res, next) {
  try {
    const requestParam = await resumeSchemaParam.validateAsync(req.params);
    const resume = await respository.findResume(requestParam.resumeId);
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }
    const response = await axios.get(resume.resume_url, {
      responseType: "stream",
    });
    if (!response)
      return res
        .status(400)
        .json({ success: false, message: "Download was'nt succesfull" });
    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.setHeader("Content-Type", "application/pdf");
    response.data.pipe(res);
  } catch (err) {
    errorHander(err, req, res, next);
  }
}

async function listResume(req, res, next){
  try{

  }catch(err){
    errorHander(err, req, res, next);
  }
}

module.exports = { enhanceResume, previewResume, deleteResume, downloadResume };
