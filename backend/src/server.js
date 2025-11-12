import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Import port
import config from "./config/config.js";
const PORT = config.PORT;

// connecting to Database
import connectDB from "./config/database.js";

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());

// Import routes
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/TaskRoutes.js";
import noteRoutes from "./routes/NoteRoutes.js";
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Note App API",
    version: "1.0.0",
    status: "Running",
  });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
  });
};

startServer();
