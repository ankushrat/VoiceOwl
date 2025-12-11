module.exports.mockDownloadAudio = async (url) => {
  return new Promise((resolve) => {
    console.log("Mock downloading:", url);
    setTimeout(() => resolve("dummy-audio-buffer"), 500);
  });
};
