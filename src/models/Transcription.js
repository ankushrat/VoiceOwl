const mongoose = require("mongoose");

const transcriptionSchema = new mongoose.Schema({
  audioUrl: { type: String, required: true },
  transcription: { type: String, required: true },
  source: { type: String, default: "mock" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transcription", transcriptionSchema);
