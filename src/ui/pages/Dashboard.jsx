import React from "react";
import CompressorCard from "../components/CompressorCard";
import Metric from "../components/Metric";


//componente de dashboard que exibe o compressor selecionado e uma visão geral de todos os compressores
export default function Dashboard({ compressor, all = [] }) {
  return (
    <div className="dashboard">
      <CompressorCard data={compressor} />

      <section className="overview">
        <h3>Visão Geral</h3>
        <div className="overview-grid">
          {all.map((c) => (
            <div key={c.id} className="overview-card">
              <h4>{c.name}</h4>
              <div className="overview-metrics">
                <Metric label="Pressão" value={c.pressureBar} unit="bar" />
                <Metric label="Temp" value={c.temperatureC} unit="°C" />
                <Metric label="Status" value={c.status} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
