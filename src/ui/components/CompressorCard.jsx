import React from "react";
import Metric from "./Metric";
import StatusPill from "./StatusPill";
import Gauge from "./Gauge";

export default function CompressorCard({ data }) {
  if (!data) return <div className="empty">Selecione um compressor…</div>;

  const pressure = data.pressureBar ?? 0;
  const temp = data.temperatureC ?? 0;
  const capacity = data.capacityPct ?? data.uptimePct ?? 0;
  const hours = data.hours ?? data.runHours ?? data.totalHours ?? 0;

  // geometria do gauge (sincronizada com Gauge.jsx)
  const W = 420, H = 260, cy = 190, r = 150, trackOffset = 14, trackStroke = 26;
  const bottomY = cy + (r + trackOffset) + trackStroke / 2;
  const overhang = Math.max(0, bottomY - H);
  const padRatio = overhang / W;
  const EXTRA_PX = 56; // margem extra p/ bolhas e sombras

  return (
    <section className="ir-panel card">
      <div className="ir-topbar">
        <div className="ir-top-left">
          <span className="ir-home" aria-hidden>🏠</span>
          <span className="ir-tab" aria-hidden>✔️</span>
          <span className="ir-tab" aria-hidden>⚠️</span>
        </div>
        <div className="ir-title">Início</div>
        <div className="ir-top-right">
          <span className="ir-page">1</span>
          <span className="ir-page-sep">|</span>
          <span className="ir-page">2</span>
        </div>
      </div>

      {/* padding-bottom automático com folga fixa */}
      <div className="ir-body" style={{ paddingBottom: `calc(${(padRatio * 100).toFixed(2)}% + ${EXTRA_PX}px)` }}>
        <div className="ir-gauge-wrap">
          {/* setpoints escondidos e footer oculto */}
          <Gauge label="Pressão (bar)" value={pressure} min={0} max={10} setpoints={[]} showSetpoints={false} showFooter={false} />
          <div className="ir-center-reading">
            <div className="ir-center-value">{Number.isFinite(pressure) ? pressure.toFixed(1) : "--"}</div>
            <div className="ir-center-unit">bar</div>
          </div>
        </div>

        <div className="ir-side">
          <div className="ir-tile ir-tile-blue">
            <div className="ir-tile-label">% Capacid</div>
            <div className="ir-tile-value">{capacity}%</div>
          </div>
          <div className="ir-tile ir-tile-blue">
            <div className="ir-tile-row"><span className="ir-ico">👟</span><span>{hours} H</span></div>
            <div className="ir-tile-row"><span className="ir-ico">🌡</span><span>{temp} °C</span></div>
          </div>
        </div>
      </div>

      <div className="grid ir-metrics">
        <Metric label="Rotação" value={data.rpm} unit="rpm" />
        <Metric label="Potência" value={data.powerKW} unit="kW" />
        <Metric label="Status" value={<StatusPill status={data.status} />} />
        <Metric label="Disponibilidade" value={`${data.uptimePct ?? "--"}%`} />
      </div>

      {data.alarms?.length ? (
        <div className="alarms">
          <h3>Alarmes</h3>
          <ul>
            {data.alarms.map((a, i) => (
              <li key={i}><strong>{a.code}</strong>: {a.message}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="no-alarms">Sem alarmes.</div>
      )}

      <div className="ir-statusbar">
        <span>Func em Carga</span>
        <div className="ir-status-icons">
          <span title="Usuário">👤</span>
          <span title="Manutenção">🛠️</span>
          <span title="Ajustes">⚙️</span>
        </div>
      </div>

      <div className="actions">
        <button className="btn ir-btn-green">Ligar</button>
        <button className="btn ir-btn-red">Desligar</button>
        <button className="btn btn-danger">Resetar Alarme</button>
      </div>
    </section>
  );
}