// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract ScoreManager
{
    using Counters for Counters.Counter; //convinience utility

    uint constant public MAX_INT_TYPE = type(uint).max;

    struct Meet
    {
        uint id;
        string lable;
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

    Counters.Counter private meetsCount;    //this is written to the blockchain (like class variable, scope belongs to entire contract)
    Counters.Counter private athletesCount; //this is written to the blockchain (like class variable, scope belongs to entire contract)
    Counters.Counter private scoresCount;   //this is written to the blockchain (like class variable, scope belongs to entire contract)

    mapping(uint => Athlete) public athletes;
    mapping(uint => Meet ) public meets;
    mapping(uint => Score ) public scores;

    function CreateAthlete(string memory anAthletsName) public 
    {
        console.log("Creates an Athlete with name: '%s' ", anAthletsName);

        athletesCount.increment();
        athletes[athletesCount.current()] = Athlete(athletesCount.current(), anAthletsName );
    }

    function CreateMeet(string memory aLable, string memory aMeetsLocation, uint aMeetsTime) public 
    {
        console.log("Creates a Meet with Location: '%s' and Time: '%d'", aMeetsLocation, aMeetsTime);

        meetsCount.increment();
        meets[meetsCount.current()] = Meet(meetsCount.current(), aLable, aMeetsLocation, aMeetsTime );
    }    

    function EnterAScore(string memory anAthletsName, string memory aMeetsName, uint aThrowDistance) public 
    {
        uint256 myAthletesCount = athletesCount.current();
        uint myAthletesID = MAX_INT_TYPE;
    
        uint myMeetsCount = meetsCount.current();
        uint myMeetID = MAX_INT_TYPE;

        uint myScoresCount = scoresCount.current();

        //First find the player ID, if the playerID = -1 then report that the player has not been found
        for(uint i=0; i<myAthletesCount; i++)
        {
            if( strcmp(athletes[i].name, anAthletsName) )
            {
                myAthletesID = athletes[i].id;
                break;
            }
        }

        if( myAthletesID == MAX_INT_TYPE)
        {
            console.log("No Athlete with name: '%s' has been recorded make sure that this Athlete is in the list of Athletes", anAthletsName);
            return;
        }

        //Find the meetID if the meet is not found then report the the meet has not been found
        for(uint i=0; i<myMeetsCount; i++)
        {
            if(strcmp(meets[i].lable, aMeetsName))
            {
                myMeetID = meets[i].id;
                break;
            }
        }


        if( myMeetID == MAX_INT_TYPE)
        {
            console.log("Invalid meet entered: '%s' make sure the meet has been added to the meet list", aMeetsName);
            return;
        }

        //If the player and the athletes have been found then see if there is already a score in the list. If so change the score
        //if not then add a enw score for this player at that particular meets
        for(uint i=0; i<myScoresCount; i++)
        {
            if(scores[i].athleteID == myAthletesID && scores[i].meetID == myMeetID )
            {
                scores[i].maxThrowDistance = aThrowDistance;
                return;
            }
        }

        //If code falls thru to here then this is a new score add a new score to our score list
        scoresCount.increment();
        scores[scoresCount.current()] = Score(scoresCount.current(), myMeetID, myAthletesID, aThrowDistance );

    }

    function ChangeAScore(uint aScoreID, uint aNewMaxThrow) public 
    {       
        scores[aScoreID] = Score(aScoreID, scores[aScoreID].meetID, scores[aScoreID].athleteID, aNewMaxThrow );
    }

    function GetAthletsCount() public view returns (uint)
    {
        return athletesCount.current();
    }

    function GetMeetsCount() public view returns (uint)
    {
        return meetsCount.current();
    }


    function GetRecordThrows() public view returns (uint)
    {
        //enumarate thru the score list looking for max scores 

        //add the score to a recods list 


    }

    //Utility functins for string support
    function memcmp(bytes memory a, bytes memory b) internal pure returns(bool)
    {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    function strcmp(string memory a, string memory b) internal pure returns(bool)
    {
        return memcmp(bytes(a), bytes(b));
    }

}