import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { origins, isCredentialsAllowed } from "./config/app-config";
import { config } from "dotenv";
import Health from "./routes/health";
import Register from "./routes/route.register";
import Auth from "./routes/route.auth";
import VerifyToken from "./middleware/verifyToken";
import Interview from "./routes/route.Interview";
// import ChatBot from "./routes/route.chatbot";
import Stats from "./routes/route.stats";
import Refresh from "./routes/route.refresh";

const app = express();

config();
app.use(
  cors({
    origin: (origin, callback) => {
      // If no origin is provided (e.g., from Postman or curl), allow the request
      if (!origin || origins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: isCredentialsAllowed, // For cookies and auth headers
  })
);
app.use(express.json());
app.use(cookieParser());

// Health check point
app.use("/api/", Health);

// Register
app.use("/api/register",Register);

// Auth
app.use("/api/auth",Auth);

// Chatbot
// app.use("/api/chatbot",ChatBot)

// Refresh
app.use("/api/refresh",Refresh);

// ------- Middeleware - verify token -----------
app.use(VerifyToken);

// Interviews
app.use("/api/interview",Interview);

// Stats
app.use("/api/stats",Stats);


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
