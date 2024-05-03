// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./MineNFT.sol"; // Ensure this import points to the file with the MineNFT contract

contract TreasureBlox is ERC20, Ownable, Pausable, ReentrancyGuard {
    uint256 public constant INITIAL_SUPPLY = 100000000 * (10**18);
    mapping(address => uint256) private _stakes;
    mapping(address => uint256) private _rewards;
    mapping(address => bool) private isStakeholder;
    mapping(address => uint256) private stakeholderIndex;
    mapping(address => uint256) private _stakingStarts;
    mapping(address => uint256) private _stakingPeriods;
    address[] private _stakeholders;
    
    MineNFT public mineNFTContract;

    event Staked(address indexed user, uint256 amount, uint256 tokenId);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event MineGenerated(address indexed user, uint256 tokenId, string tokenURI);

    constructor(address _mineNFTAddress) ERC20("TreasureBlox", "TBX") {
        _mint(msg.sender, INITIAL_SUPPLY);
        mineNFTContract = MineNFT(_mineNFTAddress);
    }

    function stakeAndGenerateMine(uint256 amount, uint256 stakingPeriod) public whenNotPaused nonReentrant {
    require(amount > 0 && balanceOf(msg.sender) >= amount, "Insufficient balance or zero stake");
    require(_stakes[msg.sender] == 0 || block.timestamp >= _stakingStarts[msg.sender] + _stakingPeriods[msg.sender], "Existing stake must be cleared or expired");

    // Transfer the tokens to the contract to lock them
    _transfer(msg.sender, address(this), amount);

    // Record the staking details
    _stakes[msg.sender] += amount;
    _stakingStarts[msg.sender] = block.timestamp;
    _stakingPeriods[msg.sender] = stakingPeriod;

    // Logic to determine the size and resource potential
    string memory tokenURI = generateTokenURI(amount, stakingPeriod);
    uint256 tokenId = mineNFTContract.mintMine(msg.sender, tokenURI);
    
    addStakeholder(msg.sender);

    emit Staked(msg.sender, amount, tokenId);
    emit MineGenerated(msg.sender, tokenId, tokenURI);
}


    function unstake(uint256 amount) public whenNotPaused nonReentrant {
    require(_stakes[msg.sender] >= amount, "Insufficient staked tokens");
    require(block.timestamp >= _stakingStarts[msg.sender] + _stakingPeriods[msg.sender], "Staking period has not ended");

    _stakes[msg.sender] -= amount;
    if (_stakes[msg.sender] == 0) {
        removeStakeholder(msg.sender);
    }
    _transfer(address(this), msg.sender, amount);

    emit Unstaked(msg.sender, amount);
}

    function addStakeholder(address stakeholder) private {
        if (!isStakeholder[stakeholder]) {
            isStakeholder[stakeholder] = true;
            _stakeholders.push(stakeholder);
            stakeholderIndex[stakeholder] = _stakeholders.length - 1;
        }
    }

    function removeStakeholder(address stakeholder) private {
        if (isStakeholder[stakeholder] && _stakes[stakeholder] == 0) {
            isStakeholder[stakeholder] = false;
            uint256 index = stakeholderIndex[stakeholder];
            address lastStakeholder = _stakeholders[_stakeholders.length - 1];
            _stakeholders[index] = lastStakeholder;
            stakeholderIndex[lastStakeholder] = index;
            _stakeholders.pop();
            delete stakeholderIndex[stakeholder];
        }
    }

    function calculateReward(address stakeholder) public view returns (uint256) {
        uint256 stakeAmount = _stakes[stakeholder];
        return stakeAmount / 100;
    }

    function generateTokenURI(uint256 amount, uint256 period) private pure returns (string memory) {
    // Example attributes based on staking parameters
    string memory capacity = Strings.toString(amount * 10);  // Example: capacity scales with amount
    string memory efficiency = Strings.toString(period * 2); // Example: efficiency scales with period

    // Construct the tokenURI
    string memory baseURI = "https://yourmetadataapi.com/metadata?";
    string memory stakeParam = string(abi.encodePacked("stake=", Strings.toString(amount)));
    string memory periodParam = string(abi.encodePacked("&period=", Strings.toString(period)));
    string memory capacityParam = string(abi.encodePacked("&capacity=", capacity));
    string memory efficiencyParam = string(abi.encodePacked("&efficiency=", efficiency));

    return string(abi.encodePacked(baseURI, stakeParam, periodParam, capacityParam, efficiencyParam));
}



    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
