import React, { useState, useEffect } from "react";
import consult from "../API/Api";


function Comp2() {
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

  /*
  function filtro() {
    const id = 2;
    compressor2 = compressorData.filter((registro) => {
    return registro.id === id;
    });

    return compressor1;
  }

filtro()

*/


  if (isLoading) {
    return <div>Carregando dados do Compressor...</div>;
  }

  if (!compressorData) {
    return (
      <div>Não foi possível carregar os dados ou o objeto está vazio.</div>
    );
  }

  return (
    <div>
      <h2>Compressor 2</h2>
      <p>
        Package Discharge Pressure: {compressorData.packageDischargePressure}
      </p>
      <p>Sum Press: {compressorData.sumpPress}</p>
    </div>
  );
}

export default Comp2;
