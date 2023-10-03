const {expect} = require("chai");
const hre = require("hardhat");
const { ethers } = require("ethers");

describe("MySWTR contract", function() {
    let Token;
    let ceeaiToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Get the contractFactory and signers here
        Token = await hre.ethers.getContractFactory("MySWTR");
        [owner, add1, add2] = await hre.ethers.getSigners();

        ceeaiToken = await Token.deploy();
    });

    it("Should set the correct name and symbol", async function () {
        expect(await ceeaiToken.name()).to.equal("Ceeai");
        expect(await ceeaiToken.symbol()).to.equal("SWTR");
    });

    it("Should set the owner correctly", async function () {
        const contractOwner = await ceeaiToken.owner();
        expect(contractOwner).to.equal(owner.address);
    });

    it("Should mint 100 SWTR tokens to the owner", async function () {
            await ceeaiToken.mint100tokens();
            const ownerBalance = await ceeaiToken.balanceOf(owner.address);

            expect(ownerBalance.toString()).to.equal("100000000000000000000");
    });

    it("Should burn 100 SWTR tokens from the owner", async function () {
        const initialOwnerBalance = await ceeaiToken.balanceOf(owner.address);

        if (initialOwnerBalance >= ethers.parseEther("100000000000000000000")) {
            await ceeaiToken.burn100tokens();
            const ownerBalance = await ceeaiToken.balanceOf(owner.address);

            expect(ownerBalance.toString()).to.equal("0");
        } else {
            console.error("Owner does not have enough balance to burn 100 SWTR tokens.");
        }
    });

    it("Should not allow non-owners to mint tokens", async function () {
        const [, nonOwner] = await hre.ethers.getSigners();

        await expect(ceeaiToken.connect(nonOwner).mint100tokens()).to.be.revertedWith("Not the owner");
    });

    it("Should not allow non-owners to burn tokens", async function () {
        const [, nonOwner] = await hre.ethers.getSigners();

        await expect(ceeaiToken.connect(nonOwner).burn100tokens()).to.be.revertedWith("Not the owner");
    });
});