
//define o esquema e validação para um objeto compressor
export function validateCompressor(c) {
  if (!c || typeof c !== "object") return false;
  const keys = ["id","name","pressureBar","temperatureC","rpm","powerKW","uptimePct","status","alarms"];
  return keys.every((k) => k in c);
}
