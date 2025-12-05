import React, { useState, useEffect } from "react";
import GaugeChart from 'react-gauge-chart'; // Importa a biblioteca do Gauge
import consult from "../API/Api";

const LIMITES = {
  ENGINECURRENT: {
    max: 100,
    zones: [0.6, 0.2, 0.2],
    colors: ['#5BE12C', '#F5CD19', '#EA4228'],
    unit: ' bar',
    title: 'Corrente do Motor'
  },
  SUMP: {
    max: 5,
    zones: [0.8, 0.1, 0.1],
    colors: ['#5BE12C', '#F5CD19', '#EA4228'],
    unit: ' bar',
    title: 'Pressão do Sump'
  },
  ENGINESPEED: {
    max: 10000,
    zones: [0.8, 0.1, 0.1],
    colors: ['#5BE12C', '#F5CD19', '#EA4228'],
    unit: ' rpm',
    title: 'Velocidade do Motor'
  },
  PACKAGEDISCHARGE: {
    max: 10000,
    zones: [0.8, 0.1, 0.1],
    colors: ['#5BE12C', '#F5CD19', '#EA4228'],
    unit: 'rpm',
    title: 'Pressão de descarga C'
  },
  ENGINEVOLTAGE: {
    max: 10000,
    zones: [0.8, 0.1, 0.1],
    colors: ['#5BE12C', '#F5CD19', '#EA4228'],
    unit: 'rpm',
    title: 'Voltagem Motor'
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
        textColor="#ffffffff"
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

        const filtro = fetchedData[3]

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


      <div id="gaugeMotorCurrent">
        <MetricGauge
          dataKey="motorCurrent"
          data={data}
          limits={LIMITES.ENGINECURRENT}
        />
      </div>

      <div id="gaugeSumpress">
        <MetricGauge id="sumpress"
          dataKey="sumpPress"
          data={data}
          limits={LIMITES.SUMP}
        />
      </div>

      <div id="gaugeVelocidadeMotor">
        <MetricGauge
          dataKey="motorSpeed"
          data={data}
          limits={LIMITES.ENGINESPEED}
        />
      </div>

       <div id="gaugeVoltagemMotor">
        <MetricGauge
          dataKey="motorVoltage"
          data={data}
          limits={LIMITES.ENGINEVOLTAGE}
        />
      </div>

       <div id="gaugePressãoDescargaConjunto">
        <MetricGauge
          dataKey="packageDischargePressure"
          data={data}
          limits={LIMITES.PACKAGEDISCHARGE}
        />
      </div>


      <div id="vacuoAdmissao">
        <br />
        <p>
          <div className="tituloData">{"Vacuo de Admissão:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.inletVacuum}</div>
        </p>
      </div>

      <div id="pressaoEntrada">
        <br />
        <p>
          <div className="tituloData">{"Pressão de entrada do filtro de arrefecimento:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.coolantFilterInPressure}</div>
        </p>
      </div>

      <div id="pressaoSaidaFiltro">
        <br />
        <p>
          <div className="tituloData">{"Pressão de saida do filtro de arrefecimento:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.coolantFilterOutPressure}</div>
        </p>
      </div>

      <div id="pressaoDescargaAfterCooler">
        <br />
        <p>
          <div className="tituloData">{"Pressão de Descarga do Aftercooler:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.afterCoolerDischargePress}</div>
        </p>
      </div>

      <div id="quedaPressao">
        <br />
        <p>
          <div className="tituloData">{"Queda de pressão do separador"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.separatorPressureDrop}</div>
        </p>
      </div>

      <div id="temperaturaLiquidoArrefecimento">
        <br />
        <p>
          <div className="tituloData">{"Temperatura do Líquido de Arrefecimento Injetado"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.injectedCoolantTemp}</div>
        </p>
      </div>

      <div id="temperaturaUnidadeParafuso">
        <br />
        <p>
          <div className="tituloData">{"Temperatura da Unidade Parafuso:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.airendTemp}</div>
        </p>
      </div>

      <div id="temperaturaDescargaAftercooler">
        <br />
        <p>
          <div className="tituloData">{"Temperatura de Descarga do Aftercooler:"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.afterCoolerDischargeTemp}</div>
        </p>
      </div>

      <div id="tempoDeResfriamento">
        <br />
        <p>
          <div className="tituloData">{"Tempo de Resfriamento"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.coolerOutTemp}</div>
        </p>
      </div>

      <div id="horasRodando">
        <br />
        <p>
          <div className="tituloData">{"Horas Rodando"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.runningHours}</div>
        </p>
      </div>

      
      <div id="voltagemDoInput">
        <br />
        <p>
          <div className="tituloData">{"Voltagem do Input"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.inputVoltage}</div>
        </p>
      </div>

      <div id="kWh">
        <br />
        <p>
          <div className="tituloData">{"KWH"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.kWh}</div>
        </p>
      </div>

        <div id="encomendaKw">
        <br />
        <p>
          <div className="tituloData">{"Encomenda KW"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.packageKW}</div>
        </p>
      </div>

       <div id="voltagemDcBus">
        <br />
        <p>
          <div className="tituloData">{"Voltagen DC Bs"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.dcBusVoltage}</div>
        </p>
      </div>

      <div id="porcentagemDeCapacidade">
        <br />
        <p>
          <div className="tituloData">{"Porcentagem de Capacidade"}</div>
        </p>
        <p>
          <div className="valorDado">{compressorData.percentCapacity}</div>
        </p>
      </div>


    </div>
  );
}
export default Comp2;
