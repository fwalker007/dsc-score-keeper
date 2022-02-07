import '../styles/globals.css'
import React from "react";
import Table from "./Table"
import WebAuthLoader from "./Web3Auth/WebAuthLoader.js"
import QueryLoader from "./Web3Auth/QueryLoader.js"
import Web3MinLoader from "./Web3Auth/WebMinLoader.js"
import Web3AuthLogin from "./components/Web3AuthoLogin"
import athletesData from "./TestData.json"

 
function Marketplace({ Component, pageProps }) 
{
 // const data = React.useMemo(() => getData(), []);

  return(

    <div>
        
      <WebAuthLoader delayms={500}/>
      <QueryLoader  delayms={500}/>
      <Web3MinLoader delayms={500}/>

      <nav className="border-b p-6">
        <Web3AuthLogin/>
      </nav>

      <div >
          <Table data={athletesData} />
      </div>

      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace