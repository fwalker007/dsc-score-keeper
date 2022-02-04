const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTManager", function () 
{
    it("Should execute NFT management", async function()
    {
      const Manager = await ethers.getContractFactory("NFTManager")
      const manager = await Manager.deploy()
      await manager.deployed()
      const managerAddress = manager.address
  
      const NFT = await ethers.getContractFactory("NFT")
      const nft = await NFT.deploy(managerAddress)
      await nft.deployed()
      const nftContractAddress = nft.address
 
      await nft.CreateMedalToken("https://ipfs.infura.io/ipfs/QmVZRDT1wjD6GVnKsn2wwMib18hfekknnXUq1YmrnoXV2F ")
      await nft.CreateMedalToken("https://ipfs.infura.io/ipfs/QmVZRDT1wjD6GVnKsn2wwMib18hfekknnXUq1YmrnoXV2F ")
    
      await manager.CreateDigitalMedal(nftContractAddress, 1)
      await manager.CreateDigitalMedal(nftContractAddress, 2)
      
      //Use this to transfer the NFT to the Athelete
     // const [_, buyerAddress] = await ethers.getSigners()
       
      items = await manager.fetchMyNFTs()
      items = await Promise.all(items.map(async i =>
      {
        const tokenUri = await nft.tokenURI(i.tokenId)
        let item = {
          tokenId: i.tokenId.toString(),
          owner: i.owner,
          tokenUri
        }
        return item
      }))
      console.log('items: ', items)
    })
});
