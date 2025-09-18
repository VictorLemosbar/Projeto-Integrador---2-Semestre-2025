//Configuração principal do Express

const express = require("express");
const compressorRoutes = require("./routes/compressorRoutes");

const app = express();

app.use(express.json());
app.use("/api", compressorRoutes);

module.exports = app;