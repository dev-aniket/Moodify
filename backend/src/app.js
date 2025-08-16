const express = require("express");
const songRoutes = require("./routes/song.route");
const cors = require("cors");

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,            // e.g. https://yourapp.vercel.app
  "http://localhost:5173",            // Vite dev
  "http://localhost:3000"             // CRA dev (if you use CRA)
];

app.use(cors({ origin: allowedOrigins }));

app.use("/", songRoutes);

module.exports = app;