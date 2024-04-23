// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TreasureBlox is ERC20, Ownable, Pausable {
    uint256 public constant INITIAL_SUPPLY = 100000000 * (10**18);  // 100 million tokens with 18 decimal places
    mapping(address => uint256) private _stakes;
    mapping(address => uint256) private _rewards;
    address[] private _stakeholders;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor() ERC20("Treasure Blox", "TBX") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Function to stake tokens
    function stake(uint256 amount) public whenNotPaused {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");

        _burn(msg.sender, amount);
        _stakes[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    // Function to unstake tokens
    function unstake(uint256 amount) public whenNotPaused {
        require(amount > 0, "Cannot unstake 0 tokens");
        require(_stakes[msg.sender] >= amount, "Insufficient staked tokens");

        _stakes[msg.sender] -= amount;
        _mint(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    // Function to claim mining rewards
    function claimReward() public whenNotPaused {
        uint256 reward = _rewards[msg.sender];
        require(reward > 0, "No rewards to claim");

        _rewards[msg.sender] = 0;
        _mint(msg.sender, reward);
        emit RewardPaid(msg.sender, reward);
    }

    // Admin function to distribute rewards
    function distributeRewards() public onlyOwner {
        for (uint256 i = 0; i < _stakeholders.length; i++) {
            address stakeholder = _stakeholders[i];
            uint256 stake = _stakes[stakeholder];
            if (stake == 0) continue;

            uint256 reward = calculateReward(stakeholder);
            _rewards[stakeholder] += reward;
        }
    }

    // Calculate rewards for a stakeholder
    function calculateReward(address stakeholder) public view returns (uint256) {
        uint256 stake = _stakes[stakeholder];
        return stake / 100;  // 1% reward
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
