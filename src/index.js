const express = require('express');
const enhancement = require('./modules/resume-enhancement/route');
const establishDatabaseConnection = require('./utils/database');
const sawggerUi = require('swagger-ui-express')
const swaggerDocument = require('../doc/swagger.json')

const app = express();

const port = process.env.PORT || 3000;

establishDatabaseConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/resumes", enhancement);
app.use("/api/docs", sawggerUi.serve, sawggerUi.setup(swaggerDocument))
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to Resume Enhancement API 🔥🔥" });
});

app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
