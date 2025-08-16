const express = require("express");
const songRoutes = require("./routes/song.route");
const cors = require("cors");

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,           
  "http://localhost:5173",            
  "http://localhost:3000"             
];


app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: The CORS origin ${origin} is not allowed.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use("/", songRoutes);

module.exports = app;