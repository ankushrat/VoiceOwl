const TranscriptionService = require("../services/transcription.service");

exports.createTranscription = async (req, res) => {
  try {
    const { audioUrl } = req.body;

    if (!audioUrl) return res.status(400).json({ msg: "audioUrl is required" });

    const result = await TranscriptionService.createTranscription(audioUrl);

    res.json({
      id: result._id,
      message: "Transcription saved successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.getTranscriptions = async (req, res) => {
  try {
    const data = await TranscriptionService.getLast30Days();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
