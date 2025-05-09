import { config } from "dotenv";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import messageRoute from "./routes/message.route.js";
import sponsorRoute from "./routes/sponsor.route.js";
import reviewRoute from "./routes/review.route.js";

import { ERROR_404 } from "./utils/error.utils.js";
import { connectToMongoDB } from "./utils/db.utils.js";

config();

export const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    message: "You're sending too many requests. Please try again later.",
  }),
);

app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/sponsors", sponsorRoute);
app.use("/api/v1/reviews", reviewRoute);

app.use((req, res, next) => next(ERROR_404));
app.use((error, req, res, next) => res.status(error.status || 500).json(error));

export const port = process.env.PORT || 5000;
connectToMongoDB(() =>
  app.listen(port, () => {
    console.log("[DITS Server]: Connected to MongoDB...");
    console.log(`[DITS Server]: Running on port ${port}...`);
  }),
);
