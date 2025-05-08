import ApiKey from "../models/apiKey.model.js";

async function apiKeyMiddleware(req, res, next) {
  const apiKey = await ApiKey.findOne({ key: req.header("x-api-key") || "" }).exec();
  if (!apiKey) {
    return next({
      status: 401,
      title: "Unauthorized",
      message: "You are not authorized to access this resource. Invalid API key.",
    });
  }

  next();
}

export default apiKeyMiddleware;
