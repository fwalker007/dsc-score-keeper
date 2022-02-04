const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTManager", function () 
{
    it("Should execute NFT management", async function()
    {
      const Manager = await ethers.getContractFactory("NFTManager")
      const manager = await Manager.deploy()
      await manager.deployed()
      const marketAddress = manager.address
  
      const NFT = await ethers.getContractFactory("NFT")
      const nft = await NFT.deploy(marketAddress)
      await nft.deployed()
      const nftContractAddress = nft.address
 
      await nft.createToken("https://www.mytokenlocation.com")
      await nft.createToken("https://www.mytokenlocation2.com")
    
      await manager.createRecordThrowItem(nftContractAddress, 1)
      await manager.createRecordThrowItem(nftContractAddress, 2)
      
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
