import '../styles/globals.css'
import React from "react";
import Table from "./Table"
import WebAuthLoader from "./Web3Auth/WebAuthLoader.js"
import QueryLoader from "./Web3Auth/QueryLoader.js"
import Web3MinLoader from "./Web3Auth/WebMinLoader.js"
import Web3AuthLogin from "./Web3Auth/Web3AuthoLogin"
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

      <div>

      </div>
      <div className="place-content-center"  style={{textAlign:"center" }}>
          <button className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg ">
              Save Scores
          </button>
      </div>
      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace