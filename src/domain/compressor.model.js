
//Define os possíveis status de um compressor
export const CompressorStatus = Object.freeze({
  RUNNING: "RUNNING",
  STOPPED: "STOPPED",
  ALARM: "ALARM",
});


//função para criar um objeto compressor com propriedades padrão
export function makeCompressor({ id, name, pressureBar, temperatureC, rpm, powerKW, uptimePct, status, alarms }) {
  return {
    id,
    name,
    pressureBar,
    temperatureC,
    rpm,
    powerKW,
    uptimePct,
    status,
    alarms: alarms || [],
  };
}
