// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ResourceERC721.sol";

contract ResourceManager {
    mapping(string => address) public resources;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Function to register a new resource type and its associated contract
    function addResource(string memory name, address contractAddress) public onlyOwner {
        require(resources[name] == address(0), "Resource already registered");
        resources[name] = contractAddress;
    }

    // Function to mint a resource, assuming the caller is authorized
    function mintResource(string memory name, address to, uint256 tokenId) public onlyOwner {
        require(resources[name] != address(0), "Resource not registered");
        ResourceERC721(resources[name]).mint(to, tokenId);
    }

    // Function to transfer ownership of the ResourceManager
    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
