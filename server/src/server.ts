import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { origins, isCredentialsAllowed } from "./config/app-config";
import { config } from "dotenv";
import Health from "./routes/health";
import Register from "./routes/route.register";

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

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
