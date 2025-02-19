import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./database/config/db.js";
import indexRoute from "./routes/index.Route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", indexRoute);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        console.log("📦 Running Migrations & Syncing Database...");

        app.listen(PORT, () =>
            console.log(`🚀 Server running at http://localhost:${PORT}`)
        );
    } catch (error) {
        console.error("❌ Error starting server:", error.message);
        process.exit(1);
    }
};

startServer();
