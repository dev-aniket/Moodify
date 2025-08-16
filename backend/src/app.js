const express = require("express");
const songRoutes = require("./routes/song.route");
const cors = require("cors");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman, mobile apps)
    if (!origin) return callback(null, true);

    // Allow localhost during development
    if (origin.startsWith("http://localhost")) return callback(null, true);

    // Allow your main production frontend
    if (origin === process.env.FRONTEND_URL) return callback(null, true);

    // Allow ALL vercel.app preview deployments
    try {
      const url = new URL(origin);
      if (url.hostname.endsWith(".vercel.app")) {
        return callback(null, true);
      }
    } catch (e) {
      return callback(new Error("Invalid origin"));
    }

    // Otherwise block
    return callback(new Error(`CORS policy: The CORS origin ${origin} is not allowed.`));
  }
};

app.use(cors(corsOptions));

// Your routes
app.use("/", songRoutes);

module.exports = app;
