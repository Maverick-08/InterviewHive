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
app.use("/", Health);

// Register
app.use("/api/register",Register);

// Auth
app.use("/api/auth",Auth);

// ------- Middeleware - verify token -----------
app.use(VerifyToken);

// Interviews
app.use("/api/interview",Interview)


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
