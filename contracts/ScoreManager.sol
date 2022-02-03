// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract ScoreManager
{
    uint public meetsCount = 0;    //this is written to the blockchain (like class variable, scope belongs to entire contract)
    uint public athletesCount = 0; //this is written to the blockchain (like class variable, scope belongs to entire contract)
    uint public scoresCount = 0;   //this is written to the blockchain (like class variable, scope belongs to entire contract)

    struct Meet
    {
        uint id;
        string location;
        uint  time; //(UTC)
    }

    struct Athlete
    {
        uint id;
        string name;
    }

    struct Score
    {
        uint id;
        uint meetID;
        uint athleteID;
        uint maxThrowDistance; //(feet)
    }

    mapping(uint => Athlete) public athletes;
    mapping(uint => Meet ) public meets;
    mapping(uint => Score ) public scores;

    function CreateAthlete(string memory anAthletsName) public 
    {
        console.log("Creates an Athlete with name: '%s' ", anAthletsName);

        athletesCount++;
        athletes[athletesCount] = Athlete(athletesCount, anAthletsName );
    }

    function CreateMeet(string memory aMeetsLocation, uint aMeetsTime) public 
    {
        console.log("Creates a Meet with Location: '%s' and Time: '%d'", aMeetsLocation, aMeetsTime);

        meetsCount++;
        meets[meetsCount] = Meet(meetsCount, aMeetsLocation, aMeetsTime );
    }    

    function EnterAScore(uint anAthletsID, uint aMeetsID, uint aMaxThrow) public 
    {
        scoresCount++;
        scores[scoresCount] = Score(scoresCount, aMeetsID, anAthletsID, aMaxThrow );
    }

    function ChangeAScore(uint aScoreID, uint aNewMaxThrow) public 
    {        
        scores[aScoreID] = Score(aScoreID, scores[aScoreID].meetID, scores[aScoreID].athleteID, aNewMaxThrow );
    }

    function GetAthletsCount() public view returns (uint)
    {
        return athletesCount;
    }

    function GetMeetsCount() public view returns (uint)
    {
        return meetsCount;
    }

}