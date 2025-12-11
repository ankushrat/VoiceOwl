const express = require("express");
const router = express.Router();
const { azureTranscription } = require("../controllers/azure.controller");

router.post("/azure-transcription", azureTranscription);

module.exports = router;
