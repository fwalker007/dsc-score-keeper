const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ScoreManager", function () 
{
  it("Should create an Athelete", async function ()
  {
    const ScoreManagerContract = await ethers.getContractFactory("ScoreManager");
    const scoreManager = await ScoreManagerContract.deploy();
    await scoreManager.deployed();

    const atheletsCountBefore =  await scoreManager.GetAthletsCount();

    expect(await scoreManager.CreateAthlete("Ben Petters"));
    
    expect(await scoreManager.GetAthletsCount()).to.equal(atheletsCountBefore + 1);
    
  });

  it("Should create a meet", async function ()
  {
    const ScoreManagerContract = await ethers.getContractFactory("ScoreManager");
    const scoreManager = await ScoreManagerContract.deploy();
    await scoreManager.deployed();

    const meetCountBefore =  await scoreManager.GetMeetsCount();

    expect(await scoreManager.CreateMeet("Test Location", 565658,));
    
    expect(await scoreManager.GetMeetsCount()).to.equal(meetCountBefore + 1);
  });

  it("Should create a score", async function ()
  {
    const ScoreManagerContract = await ethers.getContractFactory("ScoreManager");
    const scoreManager = await ScoreManagerContract.deploy();
    await scoreManager.deployed();

    const scoreCountBefore =  await scoreManager.GetScoreCount();

    expect(await scoreManager.EnterAScore(1,1,120));
    
    expect(await scoreManager.GetScoreCount()).to.equal(scoreCountBefore + 1);
  });

});
