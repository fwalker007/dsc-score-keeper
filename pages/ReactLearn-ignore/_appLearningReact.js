import React from "react"
import { useEffect, useState } from 'react'
import ReactDom from "react-dom"
import Counter from "./components/counter"
import Home from "..";


function NavBar() {
    const [count, setCount] = useState(0);
  
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => 
    {
   
    });
  
    return (
      <div>
        <Counter/>
        <Home></Home>
        <p>You  {count} times</p>
        <button onClick={() => setCount( Counter.Counter )}>
          Click me
        </button>
      </div>
    );
  }

  export default NavBar