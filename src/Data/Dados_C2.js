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

const MetricGauge = ({ dataKey, data, limits }) => {
  const currentValue = data[dataKey] || 0;

  const percentValue = currentValue / limits.max;

  return (
    <div style={{color: "white", alignItems: 'center', maxWidth: '150px', }}>
      {/* Estilização inicial do cauge */}

      <h3>{limits.title}</h3>

      <GaugeChart
        id={`gauge-${dataKey}`}
        nrOfLevels={limits.zones.length}
        arcsLength={limits.zones}
        colors={limits.colors}
        arcWidth={0.3}
        percent={percentValue > 1 ? 1 : percentValue}
        textColor="#000"
        needleColor="#345243"
        formatTextValue={() => `${currentValue.toFixed(1)}${limits.unit}`}
        animate={true}
      />
    </div>
  );
};

function Comp2() {

  const [compressorData, setCompressorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        //fetchedData recebe o json de dados
        let fetchedData = await consult();

        const filtro = fetchedData[2]

        if (filtro) {
          setCompressorData(filtro);
        } else {
          setCompressorData(null);
          console.log("Nenhum registro com id=2 encontrado!");
        }

      
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);


  if (isLoading) {
    return <div id="mensagemLoading">Carregando dados do Compressor...</div>;
  }

  if (!compressorData) {
    return <div id="mensagemErro">Não foi possível carregar os dados.</div>;
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
        <MetricGauge id="sumpress"
          dataKey="sumpPress"
          data={data}
          limits={LIMITES.SUMP}
        />
      </div>


      <div id="horasFuncionamento">
        <br />
        <p>
          <div className="tituloData">{"Vacuo de Admissão:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.inletVacuum}</div>
        </p>
      </div>

      <div id="temperatura">
        <br />
        <p>
          <div className="tituloData">{"Pressão de entrada do filtro de arrefecimento:"}</div>
        </p>
        <br />
        <p>
          <div className="valorDado">{compressorData.coolantFilterInPressure}</div>
        </p>
      </div>

      <div id="velocidadeMotor">
        <br />
        <p>
          <div className="tituloData">{"Pressão de saida do filtro de arrefecimento:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.coolantFilterOutPressure}</div>
        </p>
      </div>

      <div id="potenciaUnidade">
        <br />
        <p>
          <div className="tituloData">{"Pressão de Descarga do Aftercooler:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.afterCoolerDischargePress}</div>
        </p>
      </div>

      <div id="correnteMotor1">
        <br />
        <p>
          <div className="tituloData">{"Queda de pressão do separador"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.separatorPressureDrop}</div>
        </p>
      </div>

      <div id="correnteMotor2">
        <br />
        <p>
          <div className="tituloData">{"Temperatura do Líquido de Arrefecimento Injetado"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.injectedCoolantTemp}</div>
        </p>
      </div>

      <div id="tensaoEntradaCA">
        <br />
        <p>
          <div className="tituloData">{"Temperatura da Unidade Parafuso:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.airendTemp}</div>
        </p>
      </div>

      <div id="tensaoEntradaGBT">
        <br />
        <p>
          <div className="tituloData">{"emperatura de Descarga do Aftercooler:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.afterCoolerDischargeTemp}</div>
        </p>
      </div>

      <div id="temperaturaGBTIZ">
        <br />
        <p>
          <div className="tituloData">{"Temperatura de GBT IZ:"}</div>
        </p>
        <p>
          <div className="valorDado">{2}</div>
        </p>
      </div>

    

    </div>
  );
}
export default Comp2;
