// ponto de entrada do backend EXPRESS NODE
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("rodando com sucesso!");
});

app.get("/api/compressors", (req, res) => {
  res.json([
    { id: "C01", name: "Compressor 01", status: "RUNNING" },
    { id: "C02", name: "Compressor 02", status: "STOPPED" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


//SIMULAÇÃO BÁSICA, A SER SUBSTITUÍDA POR LÓGICA REAL DE CONEXÃO AOS COMPRESSORES
//ex: via Modbus TCP, OPC-UA, etc.