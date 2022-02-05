import React, {Component} from 'react';

class Web3AuthLogin extends Component 
{
    state = 
    { 
        name:''
    };


    Login()
    {
      console.log("Loging in: " )
  
      const web3authSdk = window.Web3auth
      let web3AuthInstance = null;
  
  
      (async function init() {
  
        //STEP: 1
        console.log("Step 1" )
        web3AuthInstance = new web3authSdk.Web3Auth({
          chainConfig: {
            chainNamespace: "eip155"
          },
          clientId: "BAm9r3NVhvXabS8XRfaOMQkrGCSMs8pYlhlQltyHPssEKE6XeR_a2aSmg_c3UD0CgEgzC1nxyr9_vkODLPJGQKQ" 
        });
  
        //subscribeAuthEvents(web3AuthInstance)
        console.log("Step 2" )
        await web3AuthInstance.initModal();
  
        try
        {
          // we will use this provider with web3 library in STEP 5.
          console.log("Step 3" )
          const provider = await web3AuthInstance.connect()
    
          // It will return user's social information if logged in with social login method
          // else it will return empty object.
          const user = await web3AuthInstance.getUserInfo();
  
      //    this.state.name = user.name;
          console.log(user)
  
        }
        catch (error) 
        {
          console.log(error)
        }  
  
      })();
    }
  


    render()
    {
        return (
            <React.Fragment>
                <p className="text-4xl font-bold" style={{height: '100px', fontSize: "40px"}} >
                     <b>SCORE KEEPER {this.state.name} </b>
                </p>
                <button onClick={this.Login} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                    Login
                </button>
            </React.Fragment>
        );
    }






}

export default Web3AuthLogin;