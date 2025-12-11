const express = require("express");
const router = express.Router();
const {
  createTranscription,
  getTranscriptions
} = require("../controllers/transcription.controller");

router.post("/transcription", createTranscription);
router.get("/transcriptions", getTranscriptions);

module.exports = router;
