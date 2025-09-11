import { useState } from 'react'

import '../src/Styles/style.css'

import P1 from "./Components/P1"
import P2 from "./Components/P2"
import Home from "./Components/Home"

import { dados1 } from './Data/c1'
import { dados2 } from './Data/c2'

function MyApp() {

  let [active, setActive] = useState("home")

  return (

    <div>

      {active === "home" && <Home />}


      <button id = "compressor1" onClick={() => setActive('comp1')}></button>
      <button id = "compressor2"onClick={() => setActive('comp2')}></button>


      {active === 'comp1' && <P1 key={dados1.id} dado={dados1} />}
      {active === 'comp2' && <P2 key={dados2.id} dado={dados2} />}


    </div>



  )
}
export default MyApp