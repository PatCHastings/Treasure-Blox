// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ResourceManager.sol";

contract ResourceDeployManager {
    ResourceManager public resourceManager;

    constructor(address _resourceManagerAddress) {
        resourceManager = ResourceManager(_resourceManagerAddress);
    }

    function rewardPlayerWithResource(string memory resourceName, address player, uint256 tokenId) public {
        // Here you would add your game logic to check if the player has met the conditions for the reward
        // For now, we will assume the conditions are met and the caller has the necessary permissions

        // Call ResourceManager to mint the resource to the player
        resourceManager.mintResource(resourceName, player, tokenId);
    }
}
