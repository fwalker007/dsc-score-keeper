import React, {Component} from 'react';
import { ADAPTER_EVENTS, CHAIN_NAMESPACES } from "@web3auth/base";

class Web3AuthLogin extends Component 
{
  constructor(props)
     {
        super(props);

        this.state = {
          msbg:''
        }
     }

   login = async () =>
    {
      console.log("Loging in: " )
   
      const web3authSdk = window.Web3auth
      let web3AuthInstance = null;
      const subscribed = false;
      let user = null;

   //   (async function init() 
   //   {
         //STEP: 1
        console.log("Step 1" )

        const polygonMumbaiConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          rpcTarget: "https://rpc-mumbai.maticvigil.com",
          blockExplorer: "https://mumbai-explorer.matic.today",
          chainId: "0x13881",
          displayName: "Polygon Mumbai Testnet",
          ticker: "matic",
          tickerName: "matic",
        };
    
        web3AuthInstance = new web3authSdk.Web3Auth({
          chainConfig: polygonMumbaiConfig,
          clientId: "BAm9r3NVhvXabS8XRfaOMQkrGCSMs8pYlhlQltyHPssEKE6XeR_a2aSmg_c3UD0CgEgzC1nxyr9_vkODLPJGQKQ",
        });

        const subscribeAuthEvents = (web3auth) => {

          if (subscribed) {
            return;
          }

          console.log("subscribing to events ");

          web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
            console.log("Yeah!, you are successfully logged in", data);
            user = data;
          });
    
          web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
            console.log("connecting");
          });
    
          web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
            console.log("disconnected");
            user = null;
          });
    
          web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
            console.log("some error or user have cancelled login request", error);
          });
    
       //   web3auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
       //     console.log("modal visibility", isVisible);
      //    });
    
        subscribed = true;
        };

        subscribeAuthEvents(web3AuthInstance)
        console.log("Step 2" )
        await web3AuthInstance.initModal();
  
        try
        {
          // we will use this provider with web3 library in STEP 5.
          console.log("Step 3" )
          const provider = await web3AuthInstance.connect()
    
          // It will return user's social information if logged in with social login method
          // else it will return empty object.
          const userInfo = await web3AuthInstance.getUserInfo();
          console.log(userInfo);

          this.setState({
            msbg: userInfo.name
           })
        }
        catch (error) 
        {
          console.log(error)
        } 
        finally
        {
          await web3AuthInstance.logout();
        }
    
    
  
   //   })();
    }
  
    Logout = async () => {
      if (!web3AuthInstance) return;
      await web3AuthInstance.logout();
    };


    render()
    {
        return (
            <React.Fragment>
              <div className="h-56 grid grid-cols-3 gap-4 content-start">
                <div>
                  
                </div>

                <div>
                  <p className="text-4xl font-bold" style={{height: '100px', fontSize: "40px"}} >
                    <b>SCORE KEEPER {this.state.msbg} </b>
                  </p>
                </div>
                <div>
                    <button onClick={this.login} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                    Login
                </button>
                </div>
              
              </div>
            </React.Fragment>
        );
    }



}
export default Web3AuthLogin;