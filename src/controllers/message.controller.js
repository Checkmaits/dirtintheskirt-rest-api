import Message from "../models/message.model.js";
import { processError } from "../utils/error.utils.js";

export async function createMessage(req, res, next) {
  try {
    const hasMessage = await Message.findOne({
      $or: [{ email: req.body.email || "" }, { ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress }],
    });
    if (hasMessage) {
      return next({
        status: 409,
        title: "Message already exists",
        message:
          "You've already sent a contact form message. Please wait for a response via email. If you believe this is an error, please contact us via email at hello@silvercoco.ca",
      });
    }

    const message = new Message(req.body);
    await message.save();
    res.status(201).json({
      message: `Message entry created successfully (ID: ${message.id})`,
    });
  } catch (error) {
    processError(error, next);
  }
}
