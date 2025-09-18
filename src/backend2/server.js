//Ponto de entrada do backend

const app = require("./app");
const { connect } = require("./services/modbusService");

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  await connect(); // conecta ao Modbus na inicialização!!
});
