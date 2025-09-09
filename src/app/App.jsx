//importa o React e hooks usados para estado, efeitos colaterais e memorização
import React, { useMemo, useState, useEffect } from "react";
//importa o componente de cabeçalho da interface
import Header from "../ui/components/Header";
//importa a página principal do painel (dashboard)
import Dashboard from "../ui/pages/Dashboard";
//importa a função que busca os dados dos compressores (simulação de API ou infra)
import { fetchCompressors } from "../infra/compressors.api";


//componente principal da aplicação
export default function App() {
  const [compressors, setCompressors] = useState([]);
  const [activeId, setActiveId] = useState("C-01");

  useEffect(() => {
    setCompressors(fetchCompressors());
  }, []);
  //encontra o compressor ativo com base no ID selecionado
  const active = useMemo(
    () => compressors.find((c) => c.id === activeId) || null,
    [compressors, activeId]
  );

  return (
    <div className="container">
      <Header
        title="Painel de Compressores"
        tabs={compressors.map((c) => ({ id: c.id, label: c.name }))}
        activeTab={activeId}
        onChangeTab={setActiveId}
      />
      <main>
        <Dashboard compressor={active} all={compressors} />
      </main>
      <footer className="footer">Projeto Integrador • Telemetria</footer>
    </div>
  );
}
