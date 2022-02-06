import React, {Component} from 'react';
import { Web3Auth } from "@web3auth/web3auth";
import { ADAPTER_EVENTS, CHAIN_NAMESPACES } from "@web3auth/base";
import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
import { useEffect, useState } from "react";


function Web3AuthLogintttt() 
{
      const [user, setUser] = useState(null);
      const [loaded, setLoaded] = useState(false);
      const [subscribed, setSubscribed] = useState(false);

  const login = async () => 
  {
  
        const subscribeAuthEvents = (web3auth) => {
          console.log("subscribeAuthEvents ", subscribed);
    
          if (subscribed) {
            return;
          }
          web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
            console.log("Yeah!, you are successfully logged in", data);
            setUser(data);
          });
    
          web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
            console.log("connecting");
          });
    
          web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
            console.log("disconnected");
            setUser(null);
          });
    
          web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
            console.log("some error or user have cancelled login request", error);
          });
    
          web3auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
            console.log("modal visibility", isVisible);
          });
    
          setSubscribed(true);
        };
    
        const polygonMumbaiConfig = 
        {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          rpcTarget: "https://rpc-mumbai.maticvigil.com",
          blockExplorer: "https://mumbai-explorer.matic.today",
          chainId: "0x13881",
          displayName: "Polygon Mumbai Testnet",
          ticker: "matic",
          tickerName: "matic",
        };
    
        const web3auth = new Web3Auth(
        {
          chainConfig: polygonMumbaiConfig,
          clientId: "BAm9r3NVhvXabS8XRfaOMQkrGCSMs8pYlhlQltyHPssEKE6XeR_a2aSmg_c3UD0CgEgzC1nxyr9_vkODLPJGQKQ",
        });
    
        // ⭐️ initialize modal on page mount.
        const initializeModal = async () => 
        {
          console.log("initializeModal");
          subscribeAuthEvents(web3auth);
          await web3auth.initModal();
          setLoaded(true);
        };
    
        initializeModal();

        if (!web3auth) return;
        const provider = await web3auth.connect();
        // TODO: add this provider to web3/ethers
      };

      const logout = async () => 
      {
        if (!web3auth) return;
        await web3auth.logout();
      };

      const getUserInfo = async () => 
      {
        if (!web3auth) return;
        const userInfo = await web3auth.getUserInfo();
        console.log(userInfo);
      };
 
 
        return (
            <React.Fragment>
                <p className="text-4xl font-bold" style={{height: '100px', fontSize: "40px"}} >
                     <b>SCORE KEEPER </b>
                </p>
                <button onClick={login} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                    Login
                </button>
            </React.Fragment>
        );


}

export default Web3AuthLogintttt;