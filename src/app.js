import express from 'express';

import appRoutes from "./routes/index.js";
import connectDB from "./config/dataBase.js";

const app = express();

app.use(express.json());
// connect to database
connectDB();

// routes
app.use(appRoutes);

// module.exports = app;
export default app;