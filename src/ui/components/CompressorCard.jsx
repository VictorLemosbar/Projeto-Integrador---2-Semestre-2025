import React from "react";

//importando componentes auxiliares para exibir métricas, status e gráficos!!!!!!! bliblioteca muito utiil
import Metric from "./Metric";

//componentes visuais para status e gráficos
import StatusPill from "./StatusPill";

//componente de gráfico de medidor (gauge)!! estilo o nodered!
import Gauge from "./Gauge";


//componente que exibe as informações detalhadas de um compressor
export default function CompressorCard({ data }) {
  if (!data) return <div className="empty">Selecione um compressor…</div>;

  return (
    <section className="card">
      <div className="card-header">
        <h2>{data.name}</h2>
        <StatusPill status={data.status} />
      </div>


      //exibe as principais métricas do compressor em um layout de grade
      <div className="grid">
        <Metric label="Pressão" value={data.pressureBar} unit="bar" />
        <Metric label="Temperatura" value={data.temperatureC} unit="°C" />
        <Metric label="Rotação" value={data.rpm} unit="rpm" />
        <Metric label="Potência" value={data.powerKW} unit="kW" />
        <Metric label="Disponibilidade" value={`${data.uptimePct}%`} />
      </div>

        //exibe gráficos de medidor (gauge) para pressão e temperatura
      <div className="gauges">
        <Gauge label="Pressão (0-10 bar)" value={data.pressureBar} min={0} max={10} />
        <Gauge label="Temperatura (0-120 °C)" value={data.temperatureC} min={0} max={120} />
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

      <div className="actions">
        <button className="btn">Ligar</button>
        <button className="btn btn-outline">Desligar</button>
        <button className="btn btn-danger">Resetar Alarme</button>
      </div>
    </section>
  );
}
