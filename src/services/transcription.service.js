const Transcription = require("../models/Transcription");
const { mockDownloadAudio } = require("../utils/mockDownloader");

class TranscriptionService {
  static async createTranscription(audioUrl) {
    await mockDownloadAudio(audioUrl);

    const fakeTranscription = "This is a mocked transcription text.";

    const record = await Transcription.create({
      audioUrl,
      transcription: fakeTranscription
    });

    return record;
  }

  static async getLast30Days() {
    const date = new Date();
    date.setDate(date.getDate() - 30);

    return await Transcription.find({
      createdAt: { $gte: date }
    });
  }
}

module.exports = TranscriptionService;
