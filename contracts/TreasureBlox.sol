// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TreasureBlox is ERC20, Ownable, Pausable {
    uint256 public constant INITIAL_SUPPLY = 100000000 * (10**18); // 100 million tokens
    mapping(address => uint256) private _stakes;
    mapping(address => uint256) private _rewards;
    mapping(address => bool) private isStakeholder;
    address[] private _stakeholders;  // Ensure this is declared if used

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);


    constructor() ERC20("Treasure Blox", "TBX") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function stake(uint256 amount) public whenNotPaused {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");

        _burn(msg.sender, amount);
        _stakes[msg.sender] += amount;
        addStakeholder(msg.sender);
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) public whenNotPaused {
        require(amount > 0, "Cannot unstake 0 tokens");
        require(_stakes[msg.sender] >= amount, "Insufficient staked tokens");

        _stakes[msg.sender] -= amount;
        if (_stakes[msg.sender] == 0) {
            removeStakeholder(msg.sender);
        }
        _mint(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function addStakeholder(address stakeholder) private {
        if (!isStakeholder[stakeholder]) {
            isStakeholder[stakeholder] = true;
            _stakeholders.push(stakeholder);  // Confirm push is correct here
        }
    }

    function removeStakeholder(address stakeholder) private {
        if (isStakeholder[stakeholder]) {
            isStakeholder[stakeholder] = false;
            // Proper removal from an array in Solidity can be tricky and expensive
            for (uint256 i = 0; i < _stakeholders.length; i++) {
                if (_stakeholders[i] == stakeholder) {
                    _stakeholders[i] = _stakeholders[_stakeholders.length - 1];
                    _stakeholders.pop();
                    break;
                }
            }
        }
    }

    function distributeRewards() public onlyOwner {
        for (uint256 i = 0; i < _stakeholders.length; i++) {
            address stakeholder = _stakeholders[i];
            uint256 currentStake = _stakes[stakeholder];
            if (currentStake == 0) continue;

            uint256 reward = calculateReward(stakeholder);
            _rewards[stakeholder] += reward;
        }
    }

    function calculateReward(address stakeholder) public view returns (uint256) {
        uint256 stakeAmount = _stakes[stakeholder];
        return stakeAmount / 100;  // 1% reward
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
