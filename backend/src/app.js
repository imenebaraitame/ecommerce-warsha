import express from 'express';

import appRoutes from "./routes/index.js";
import connectDB from "./config/database.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

dotenv.config();// Load .env variables
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
// connect to database
connectDB();

// routes
app.use(appRoutes);

app.use(errorMiddleware);
export default app;