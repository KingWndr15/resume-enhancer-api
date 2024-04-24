const PDFParser = require("pdf-parse");
const { marked } = require("marked");
const { Readable } = require("stream");
const PDFDOCUMENT = require("pdfkit");
const model = require("../../services/ai/gemini");
const respository = require("./repository");
const { cloudinary } = require("../../services/upload/cloudinary");
const path = require("path");

/**
 * Enhances a resume by improving its content, structure, and overall presentation.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.file - The uploaded resume file.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A Promise that resolves when the resume enhancement is complete.
 */
async function enhanceResume(req, res, next) {
  if (!req.file)
    return res.status(400).json({
      success: false,
      message: "Resume file required!",
    });

  if (req.file.mimetype !== "application/pdf")
    return res
      .status(415)
      .json({
        suucess: false,
        message: "Invalid file format pdf file expected!",
      });

  try {
    const resumeBuffer = req.file.buffer;
    const resumeText = await PDFParser(resumeBuffer);
    const enhancedContent = await model.generateContent(
      "Generate an enhanced version of the provided resume by improving its content, structure, and overall presentation. make it more compelling and impactful." +
        resumeText.text
    );
    const parsedResult = marked.parse(enhancedContent.response.text());
    const doc = new PDFDOCUMENT();
    doc.text(parsedResult);

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
            console.error(error);
            return res.status(400).json({
              success: false,
              message: "Error Uploading file to cloudinary",
            });
          }
          await respository.create(result.url);
          res.setHeader(
            "Content-Disposition",
            `attachment; filename="enhanced-${req.file.originalname}"`
          );
          res.setHeader("Content-Type", "application/pdf");
          res.end(pdfBuffer);
        }
      );
      pdfStream.pipe(cloudinaryUpload);
    });
    doc.end();
  } catch (err) {
    next(err);
  }
}

module.exports = { enhanceResume };
