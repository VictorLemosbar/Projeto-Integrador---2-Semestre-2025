import React, { useState } from "react";

//Import das estilizações
import "../src/Styles/style.css"


//Import dos componentes
import Comp1 from "./Data/Dados_C1";
import Comp2 from "../src/Data/Dados_C2";
import Comp3 from "../src/Data/Dados_C3";

function MyApp() {
  //UseState para verificar o click do botão "Compressor 1"
  const [compOneVisible, setCompOneVisible] = useState(false);

  //UseState para perificar o click do botão "Compressor 2"
  const [compTwoVisible, setCompTwoVisible] = useState(false);

  //UseState para perificar o click do botão "Compressor 3"
  const [compThreeVisible, setCompThreeVisible] = useState(false);

  //UseState que verifica o botão clicado
  const [activeComp, setActiveComp] = useState(0);

  //Constante que altera o estado do compOneVisible
  const alternarVisibilidadeComp1 = () => {
    setCompOneVisible(!compOneVisible);
    setCompTwoVisible(false);
    setCompThreeVisible(false);

  };

  //Constante que altera o estado do compTwoVisible
  const alterarVisibilidadeComp2 = () => {
    setCompTwoVisible(!compTwoVisible);
    setCompOneVisible(false);
    setCompThreeVisible(false);
  };

  //Constante que altera o estado do compTwoVisible
  const alterarVisibilidadeComp3 = () => {
    setCompThreeVisible(!compThreeVisible);
    setCompOneVisible(false);
    setCompTwoVisible(false);

  };


  //constante que guarda o componente do compressor1
  const mostrarComp1 = () => {
    if (compOneVisible) {
      return <Comp1 />;
    }
    return null;
  };

  //constante que guarda o componente do compressor2
  const mostrarComp2 = () => {
    if (compTwoVisible) {
      return <Comp2 />;
    }
    return null;
  };

  const mostrarComp3 = () => {
    if (compThreeVisible) {
      return <Comp3 />;
    }
    return null;
  };


  return (
    <div id="app">

      <div id="titulo">
        <h1>Sistema De Gerenciamento de compressores</h1>
      </div>
      <div className="menuEsquerdo">

        {/* Parte dos compressores */}
        <div id="tituloCompressor">
          <p>Compressor 1</p>
        </div>
        {/* Funçõe que verifica qual compressor foi ativado, aquele que for muda a cor da imagem dos comp*/}

        <button

          className={`compressor2 ${activeComp === 1 ? "compressor-inativo" : ""}`}
          onClick={() => {
            if (activeComp != 1) {
              setActiveComp(1);
            } else {
              setActiveComp(0);
            }
            alternarVisibilidadeComp1()
          }}
        ></button>

        <div id="tituloCompressor">
          <p>Compressor 2</p>
        </div>

        <button
          className={`compressor2 ${activeComp === 2 ? "compressor-inativo" : ""}`}
          onClick={() => {
            if (activeComp != 2) {
              setActiveComp(2);
            } else {
              setActiveComp(0);
            }
            alterarVisibilidadeComp2()
          }}
        ></button>

        <div id="tituloCompressor">
          <p>Compressor 3</p>
        </div>
        <button
          className={`compressor2 ${activeComp === 3 ? "compressor-inativo" : ""}`}
          onClick={() => {
            if (activeComp != 3) {
              setActiveComp(3);
            } else {
              setActiveComp(0);
            }
            alterarVisibilidadeComp3()
          }}
        ></button>
      </div>

      <div id="menuDireito">
        <div id="botoesEstado">
          <div id="ligar"></div>
          <div id="desligar"></div>
          </div>
      </div>

      <div id="userView">
        {compOneVisible === false ? 
        <div id="mensagem">Selecione um compressor</div>:
        <div id="clickView">
          {mostrarComp1()}
          {mostrarComp2()}
          {mostrarComp3()}
        </div>}
      </div>


    </div>
  );
}

export default MyApp;
