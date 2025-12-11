const { mockDownloadAudio } = require("../utils/mockDownloader");
const { retryWithBackoff } = require("../utils/retry");

class AzureTranscriptionService {
  static async transcribeAudio(audioUrl, language) {
    await mockDownloadAudio(audioUrl);

    const simulateAzureAPI = async () => {
      console.log("Mock calling Azure STT API...");

      // Random timeout simulation
      if (Math.random() < 0.2) {
        throw new Error("Azure timeout error");
      }

      return `Transcribed text in ${language} (mocked).`;
    };

    const transcriptionText = await retryWithBackoff(
      simulateAzureAPI,
      3,        // retries
      500       // 0.5 sec delay
    );

    return transcriptionText;
  }
}

module.exports = AzureTranscriptionService;
