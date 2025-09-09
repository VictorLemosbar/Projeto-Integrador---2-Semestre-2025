import React from "react";


//componente que exibe uma métrica com rótulo, valor e unidade
export default function Metric({ label, value, unit }) {
  return (
    <div className="metric">
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        <strong>{value}</strong>
        {unit ? <span className="metric-unit"> {unit}</span> : null}
      </div>
    </div>
  );
}
