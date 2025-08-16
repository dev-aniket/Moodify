const express = require("express");
const cors = require("cors");
const songRoutes = require("./routes/song.route");

const app = express();
app.use(express.json());

// ---------- CORS CONFIG ----------
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman, curl
    if (origin.startsWith("http://localhost")) return callback(null, true);
    if (origin === process.env.FRONTEND_URL) return callback(null, true);

    try {
      const url = new URL(origin);
      if (url.hostname.endsWith(".vercel.app")) {
        return callback(null, true);
      }
    } catch (e) {
      return callback(new Error("Invalid origin"));
    }

    return callback(new Error(`CORS policy: The CORS origin ${origin} is not allowed.`));
  }
};
app.use(cors(corsOptions));

// ---------- HEALTH CHECK ----------
app.get("/", (req, res) => {
  res.send("✅ Moodify backend is running");
});

// ---------- ROUTES ----------
app.use("/", songRoutes); // <-- Notice I mount at /api (clean separation)

module.exports = app;
