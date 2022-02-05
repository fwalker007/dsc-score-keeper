import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router' 
import axios from 'axios'
import Web3Modal from "web3modal"
import athletesData from "./TestData.json"

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmanageraddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Manager from '../artifacts/contracts/NFTManager.sol/NFTManager.json'

let rpcEndpoint = "https://8545-fwalker007-dscscorekeepe-961ys0coqz9.ws-us30.gitpod.io"

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) 
{
    rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}

export default function Home() 
{
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ name: '', description: '' })
    const router = useRouter() 
  
    async function onChange(e) 
    {
      const file = e.target.files[0]
      
      try 
      {
        console.log("OnChange:" )
  
        //Upload file to ipfs
        const added = await client.add(
          file,
          {
            progress: (prog) => console.log(`received: ${prog}`)
          }
        )
        
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setFileUrl(url)
      }
      catch (error) 
      {
        console.log('Error uploading file: ', error)
      }  
    }
  
    
    //Creates and saves item to IPFS
    async function CreateDigitalMedals() 
    {
      const items = await Promise.all(athletesData.map(async myData => 
        {
          console.log("Creating digital Medal for ..." + myData.name );
 
          const name = myData.name
          const description = myData.decription
  
          /* Create JSon metadata for IPFS */
          const data = JSON.stringify({ name , description, image: fileUrl })
  
          console.log("Data: %s " + data );
  
          try 
          {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
      
            console.log( "Medal added to IPFS : %s ", url )
      
            /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
            createSale(url)
          } 
          catch (error) 
          {
            console.log('Error uploading file: ', error)
          } 
        }))
    }
  
    async function createSale(url) 
    {
      console.log( "Adding Medal to contract " )

      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)    
      const signer = provider.getSigner()
      
      /* next, create the item */
      let contract = new ethers.Contract(nftaddress, NFT.abi, signer)

      console.log( "Call create token " )
      let transaction = await contract.CreateMedalToken(url)
      let tx = await transaction.wait()
  
      console.log( "Medal token created %d ", transaction )

      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber()
    
      /* then list the item for sale on the marketplace */
      contract = new ethers.Contract(nftmanageraddress, Manager.abi, signer)
     // let listingPrice = await contract.getListingPrice()
     // listingPrice = listingPrice.toString()
  
      transaction = await contract.CreateDigitalMedal(nftaddress, tokenId)
      await transaction.wait()

      console.log( "Done Creating medal! " )

    //  router.push('/')
    }

    useEffect(() => 
    {
        loadNFTs()
    }, [])

    async function TransferToAthlete()
    {
      athletesData.map((myData, index) => {
        console.log(myData.name)
      })
    }
    
    async function loadNFTs() 
    {    
        console.log("Loading NFT from: " + rpcEndpoint);
   
        const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(nftmanageraddress, Manager.abi, provider)
        const data = await marketContract.fetchMyNFTs()
           
        console.log("GOT HERE 2");

        const items = await Promise.all(data.map(async i => 
        {
          const tokenUri = await tokenContract.tokenURI(i.tokenId)
          const meta = await axios.get(tokenUri)
   
          console.log("GOT HERE 2.3");

          let item = {
            itemId: i.itemId.toNumber(),
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
          }
          return item
        }))
        setNfts(items)
        setLoadingState('loaded') 
    }

    console.log("GOT HERE 2.8 NFTs count: " + nfts.length);
    console.log(loadingState);

    if (loadingState === 'loaded' && !nfts.length) 
    return (
    
      <div>
        <h1 className="px-20 py-10 text-3xl">No Medals Created</h1>
        <div className="flex justify-center">
          <div className="flex justify-center">
            <input type="file" name="Asset" className="my-4" onChange={onChange} />
            {
              fileUrl && (<img className="rounded mt-4" width="350" src={fileUrl} />)
            }
          </div>

          <button onClick={CreateDigitalMedals} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Medals
          </button>
        </div>
      </div>
      
      )

    console.log("GOT HERE 3 ");

    return (
        <div className="flex justify-center">

        <div className="flex justify-center">
          <input type="file" name="Asset" className="my-4" onChange={onChange} />
          {
            fileUrl && (<img className="rounded mt-4" width="350" src={fileUrl} />)
          }
        </div>

          <button style={{textAlign:"center" }} onClick={CreateDigitalMedals} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
            Create Digital Medals
          </button>

          <div className="flex justify-center" style={{height: '100px' }}>
          <p style={{height: '100px', fontSize: "40px"}}> <b> MEDALS </b></p>
          </div>

          <div className="px-4" >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                nfts.map((nft, i) => 
                (
                  <div  style={{ maxWidth:'500px', border: "3px solid green"}} key={i} className="border shadow rounded-xl overflow-hidden">
                    <img style={{ height: '300px', display: "block", marginLeft:"auto", marginRight:"auto" }} src={nft.image} />
                    <div>
                      <button onClick={TransferToAthlete} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                        Transfer to Athlete
                      </button>
                    </div>
                    <div className="p-4">
                      <p style={{ height: '8px' }} className="text-2xl font-semibold">{nft.name}</p>
                      <div style={{ height: '40px', overflow: 'hidden' }}>
                        <p className="text-gray-400">{nft.description}</p>
                      </div>
                    </div>

                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
}