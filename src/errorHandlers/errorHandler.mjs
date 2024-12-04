export function errorHandler(error, req, res, next) {
    const status = (error.code >= 100 && error.code < 600) ? error.code : 500;
    const text = error.text || "Unknown server error " + error.message;
    console.error("Error occurred:", error);
    res.status(status).end(text);
  }