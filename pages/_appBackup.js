import '../styles/Home.module.css'

import React from "react";
import Table from "./Table";
import CreateItem from "./create-item"
import { useRouter } from 'next/router' 


function App()
{



     //Creates and saves item to IPFS
   async function CreateDigitalMedalPopup() 
   { 
     console.log( "Create Digital Medal ")
    
     CreateItem();

   }



  return (

      <main>

        <h1 style={{textAlign:"center"}}  >SCORE KEEPER </h1>

        <div >
          <Table/>
        </div>

        <button onClick={CreateDigitalMedalPopup} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Medals
        </button>
      </main>

  );
}

export default App;