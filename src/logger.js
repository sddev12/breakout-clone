const logger = {
  log(message) {
    if (window.debugMode) {
      console.log(message);
    }
  },
};

export default logger;
