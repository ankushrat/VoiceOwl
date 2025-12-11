const Transcription = require("../models/Transcription");
const AzureService = require("../services/azure.service");

exports.azureTranscription = async (req, res) => {
  try {
    const { audioUrl, language = "en-US" } = req.body;

    if (!audioUrl) {
      return res.status(400).json({ msg: "audioUrl is required" });
    }

    const transcription = await AzureService.transcribeAudio(audioUrl, language);

    const record = await Transcription.create({
      audioUrl,
      transcription,
      source: "azure"
    });

    res.json({
      id: record._id,
      message: "Azure transcription saved successfully"
    });

  } catch (err) {
    console.log("Azure Error:", err.message);
    res.status(500).json({
      msg: "Azure STT Failed",
      error: err.message
    });
  }
};
