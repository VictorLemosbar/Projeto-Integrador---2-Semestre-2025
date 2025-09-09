import React from "react";


//componente que exibe um indicador de status com cores diferentes para cada estado
const COLORS = {
  RUNNING: "#10b981",
  STOPPED: "#6b7280",
  ALARM: "#ef4444",
};

export default function StatusPill({ status }) {
  const color = COLORS[status] || "#6b7280";
  return (
    <span className="status-pill" style={{ backgroundColor: color }}>
      {status}
    </span>
  );
}
