import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { origins, isCredentialsAllowed } from "./config/app-config";
import { config } from "dotenv";
import Health from "./routes/health";
import Register from "./routes/route.register";
import Auth from "./routes/route.auth";
import Refresh from "./routes/route.refresh";

const app = express();

config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: origins,
    credentials: isCredentialsAllowed,
  })
);

// Health check point
app.use("/", Health);

// Register
app.use("/api/register",Register);

// Auth
app.use("/api/auth",Auth);

// Refresh
app.use("/api/refresh",Refresh);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
