//import '../styles/globals.css'
import React from "react";
import Table from "./Table"
import WebAuthLoader from "./Web3Auth/WebAuthLoader.js"
import QueryLoader from "./Web3Auth/QueryLoader.js"
import Web3MinLoader from "./Web3Auth/WebMinLoader.js"
import Web3AuthLogin from "./components/Web3AuthoLogin"

 
const getData = () => [
  {
    name: "Jane Cooper",
    meet1: "90",
    meet2:  "120",
    meet3:  "121",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    meet1: "90",
    meet2:  "120",
    meet3:  "121",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    meet1: "110",
    meet2:  "112",
    meet3:  "90",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jenny Wilson",
    meet1: "93",
    meet2:  "80",
    meet3:  "81",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Kristin Watson",
    meet1: "122",
    meet2:  "121",
    meet3:  "122",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cameron Williamson",
    meet1: "87",
    meet2:  "117",
    meet3:  "111",
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];


function Marketplace({ Component, pageProps }) 
{
  const data = React.useMemo(() => getData(), []);

  return(

    <div>
        
      <WebAuthLoader delayms={500}/>
      <QueryLoader  delayms={500}/>
      <Web3MinLoader delayms={500}/>

      <nav className="border-b p-6">
        <Web3AuthLogin/>
      </nav>

      <div >
          <Table data={data} />
      </div>

      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace