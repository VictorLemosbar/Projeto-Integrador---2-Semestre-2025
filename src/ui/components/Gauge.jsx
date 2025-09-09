import React from "react";


//componente de gráfico de medidor (gauge)!! estilo o nodered!
export default function Gauge({ value = 0, min = 0, max = 100, label }) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className="gauge">
      <div className="gauge-bar">
        <div className="gauge-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="gauge-label">{label}: {value}</div>
    </div>
  );
}
