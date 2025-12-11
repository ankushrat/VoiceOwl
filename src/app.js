const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const transcriptionRoutes = require("./routes/transcription.routes");
const azureRoutes = require("./routes/azure.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", transcriptionRoutes);
app.use("/api", azureRoutes);
module.exports = app;

