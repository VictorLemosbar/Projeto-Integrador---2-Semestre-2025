import React, { useState, useEffect } from "react";
import GaugeChart from 'react-gauge-chart'; // Importa a biblioteca do Gauge
import consult from "../API/Api";

const LIMITES = {
  PRESSURE: { 
    max: 10, 
    zones: [0.6, 0.2, 0.2], 
    colors: ['#5BE12C', '#F5CD19', '#EA4228'], 
    unit: ' bar',
    title: 'Pressão de Descarga'
  }, 
  SUMP: { 
    max: 5, 
    zones: [0.8, 0.1, 0.1], 
    colors: ['#5BE12C', '#F5CD19', '#EA4228'], 
    unit: ' bar',
    title: 'Pressão do Sump'
  },
};

// --- Componente Reutilizável para o Medidor (Gauge) ---
const MetricGauge = ({ dataKey, data, limits }) => {
  // Puxa o valor do objeto de dados usando a chave (dataKey)
  const currentValue = data[dataKey] || 0;
  
  // Converte o valor real (Ex: 6.6) para um percentual de 0 a 1 para o Gauge
  const percentValue = currentValue / limits.max; 

  return (
    <div style={{ textAlign: 'center', width: '250px', }}>

      <h3>{limits.title}</h3>

      <GaugeChart 
        id={`gauge-${dataKey}`}
        nrOfLevels={limits.zones.length}
        arcsLength={limits.zones}
        colors={limits.colors}
        arcWidth={0.3}
        // Limita o ponteiro a 100% (1.0) mesmo se o valor exceder o máximo
        percent={percentValue > 1 ? 1 : percentValue} 
        textColor="#000"
        needleColor="#345243"
        formatTextValue={() => `${currentValue.toFixed(1)}${limits.unit}`}
        animate={true}
      />
    </div>
  );
};


function Comp1() {
  const [compressorData, setCompressorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedData = await consult();
        setCompressorData(fetchedData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);


  if (isLoading) {
    return <div>Carregando dados do Compressor...</div>;
  }

  if (!compressorData) {
    return <div>Não foi possível carregar os dados.</div>;
  }
  
  const data = compressorData;

  return (
    <div id="comp">
      

      <div id="gaugeDischargePressure">
        
        <MetricGauge
          dataKey="packageDischargePressure"
          data={data}
          limits={LIMITES.PRESSURE}
        />
      </div>

      <div id="gaugeSumpress">

        {/* Medidor de Pressão do Sump */}
        <MetricGauge id="sumpress"
          dataKey="sumpPress"
          data={data}
          limits={LIMITES.SUMP}
        />
      </div>

      <div id="">

          <p>Sum Press: {compressorData.sumpPress}</p>

      </div>
    </div>
  );
}

export default Comp1;