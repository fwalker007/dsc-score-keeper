// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTManager is ReentrancyGuard 
{
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;

  address payable owner;

  constructor() {
    owner = payable(msg.sender);
  }

  struct MarketItem 
  {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable owner;
  }

  mapping(uint256 => MarketItem) private idToMarketItem;

  event MarketItemCreated ( uint indexed itemId, address indexed nftContract, uint256 indexed tokenId, address owner );

  
  /* Places an item for sale on the marketplace */
  function CreateDigitalMedal(address nftContract, uint256 tokenId ) public payable nonReentrant 
  {    
    _itemIds.increment();
    uint256 itemId = _itemIds.current();
  
    idToMarketItem[itemId] =  MarketItem( itemId, nftContract, tokenId, payable(msg.sender) );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketItemCreated( itemId, nftContract, tokenId, msg.sender );
  }
   

   /* Returns onlyl items that a user has purchased */
  function fetchMyNFTs() public view returns (MarketItem[] memory)
  {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

}