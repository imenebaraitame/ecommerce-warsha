// const express = require('express');
import express from 'express';
import productRoutes from './routes/index.js';
import categoryRoutes from "./routes/index.js";
const app = express();

app.use(express.json());

// routes
app.use(productRoutes);
app.use(categoryRoutes);

// module.exports = app;
export default app;