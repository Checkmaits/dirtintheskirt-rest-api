import { model, Schema } from "mongoose";

const apiKeySchema = new Schema({
  key: {
    type: String,
    required: [true, "ApiKey key is required."],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("ApiKey", apiKeySchema);
