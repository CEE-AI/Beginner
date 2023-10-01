// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MySWTR is ERC20 {
    address public owner;

    constructor()ERC20("Ceeai","SWTR"){
        owner = msg.sender;
    } 

    modifier onlyOwner() {
    require(msg.sender == owner, "Not the owner");
    _;
    }

    function mint100tokens() public onlyOwner {
        _mint(msg.sender,100*10**18); //Minting 100 SWTR tokens
    }

    function burn100tokens() public onlyOwner{
        _burn(msg.sender,100*10**18); //burning 100 SWTR tokens
    }
    
}