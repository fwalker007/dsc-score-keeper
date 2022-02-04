const hre = require("hardhat");
const fs = require('fs');

async function main() 
{
  const NFTManager = await hre.ethers.getContractFactory("NFTManager");
  const nftManager = await NFTManager.deploy();
  await nftManager.deployed();
  console.log("nftManager deployed to:", nftManager.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftManager.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address);

  let config = `
  export const nftmanageraddress = "${nftManager.address}"
  export const nftaddress = "${nft.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });