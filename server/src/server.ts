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
import ChatBot from "./routes/route.chatbot";
import Stats from "./routes/route.stats";
import Refresh from "./routes/route.refresh";
import ViewCount from "./routes/route.viewsCount";
import OAUTH from "./routes/route.oauth";
import ResetPassword from "./routes/route.resetPassword";
import Profile from "./routes/route.profile";
import Review from "./routes/route.feedback";

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

// View count
app.use("/api/",ViewCount)

// Health check point
app.use("/api/health", Health);

// Register
app.use("/api/register",Register);

// Auth
app.use("/api/auth",Auth);

// OAuth
app.use("/api/oauth",OAUTH);

// Refresh
app.use("/api/refresh",Refresh);

// Reset password
app.use("/api/reset-password",ResetPassword);

// Add Review
app.use("/api/review",Review);

// ------- Middeleware - verify token -----------
app.use(VerifyToken);

// Interviews
app.use("/api/interview",Interview);

// Chatbot
app.use("/api/chatbot",ChatBot)

// Stats
app.use("/api/stats",Stats);

// Profile
app.use("/api/profile",Profile);


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
