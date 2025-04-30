const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
