
//Simula uma API que retorna dados de compressores
import { makeCompressor, CompressorStatus } from "../domain/compressor.model";


//Dados simulados de compressores
const MOCK = [
  makeCompressor({
    id: "C-01",
    name: "Compressor 01",
    pressureBar: 7.2,
    temperatureC: 64,
    rpm: 2850,
    powerKW: 18.4,
    uptimePct: 96,
    status: CompressorStatus.RUNNING,
    alarms: [],
  }),
  makeCompressor({
    id: "C-02",
    name: "Compressor 02",
    pressureBar: 6.1,
    temperatureC: 71,
    rpm: 2750,
    powerKW: 16.9,
    uptimePct: 92,
    status: CompressorStatus.ALARM,
    alarms: [{ code: "TMP_HIGH", message: "Temperatura alta no estágio 1" }],
  }),
  makeCompressor({
    id: "C-03",
    name: "Compressor 03",
    pressureBar: 0.0,
    temperatureC: 28,
    rpm: 0,
    powerKW: 0,
    uptimePct: 88,
    status: CompressorStatus.STOPPED,
    alarms: [],
  }),
];

export function fetchCompressors() {
  return MOCK;
}
