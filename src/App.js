import React, { useState } from "react";

import "../src/Styles/style.css"
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

        <div id="tituloCompressor">
        <p>Compressor 1</p>
        </div>
        <button className="compresso1" onClick={alternarVisibilidadeComp1}> 
        </button>
        
         <div id="tituloCompressor">
        <p>Compressor 2</p>
        </div>
        <button className="compressor2" onClick={alterarVisibilidadeComp2}>
        </button>

        <div id="tituloCompressor">
        <p>Compressor 1</p>
        </div>
        <button className="compressor3" onClick={alterarVisibilidadeComp3}>
          
        </button>
        </div>

        <div id="menuDireito">
          <div id="compressorAtivo">
            <h1>p1</h1>
          </div>
        <div>
        {compOneVisible && (
          <div id="flagComp1" className="flagComp1">
          <img src="src/Images/erasebg-transformed (4).png" alt="gol" />
          </div>
        )}

        {compTwoVisible && (
          <div id="flagComp2" className="flagComp2">
          <img src="src/Images/erasebg-transformed (4).png" alt="gol" />
          </div>
        )}

        {compThreeVisible && (
          <div id="flagComp3" className="flagComp3">
          <img src="src/Images/erasebg-transformed (4).png" alt="gol" />
          </div>
        )}
      </div>

        </div>

        <div id="userView">
        <div id="clickView">
          {mostrarComp1()}
          {mostrarComp2()}
          {mostrarComp3()}
        </div>
      </div>

      
    </div>
  );
}

export default MyApp;
