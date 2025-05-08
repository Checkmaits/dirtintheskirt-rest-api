import { connect } from "mongoose";

export function connectToMongoDB(callback) {
  connect(process.env.MONGODB_URI, {})
    .then(() => callback())
    .catch((error) => {
      console.error(`[DITS Server]: Failed to connect to MongoDB...`);
      console.error(`[DITS Server]: ${error}`);
    });
}
