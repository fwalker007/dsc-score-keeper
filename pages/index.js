import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
  nftaddress, nftmanageraddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Manager from '../artifacts/contracts/NFTManager.sol/NFTManager.json'

let rpcEndpoint = "https://8545-fwalker007-dscscorekeepe-h4eg3xg1lce.ws-us30.gitpod.io"

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) 
{
    rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}
  
export default function Home() 
{
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => 
    {
        loadNFTs()
    }, [])

    async function loadNFTs() 
    {    
        console.log("Loading NFT from: " + rpcEndpoint);
   
        const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(nftmanageraddress, Manager.abi, provider)
        const data = await marketContract.fetchMyNFTs()
        
        const items = await Promise.all(data.map(async i => 
        {
          const tokenUri = await tokenContract.tokenURI(i.tokenId)
          const meta = await axios.get(tokenUri)
   
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

    console.log("GOT HERE 2 ");

    console.log(loadingState);
    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No NFTs HAVE BEEN CREATED</h1>)

    console.log("GOT HERE 3 ");

    return (
        <div className="flex justify-center">
          <div className="px-4" style={{ maxWidth: '1600px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {
                nfts.map((nft, i) => (
                  <div key={i} className="border shadow rounded-xl overflow-hidden">
                    <img src={nft.image} />
                    <div className="p-4">
                      <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                      <div style={{ height: '70px', overflow: 'hidden' }}>
                        <p className="text-gray-400">{nft.description}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-black">
                      <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                      <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
}