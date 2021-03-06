// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage 
{
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Metaverse", "METT") 
    {
        contractAddress = marketplaceAddress;
    }

    function CreateMedalToken(string memory tokenURI) public returns (uint) 
    {       
        console.log("Create Medal Token");

        tokenIds.increment();
        uint256 newItemId = tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);

        console.log("New Token %d ", newItemId);


        return newItemId;
    }
}