// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MineNFT is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("MineNFT", "MINE") {}

    function mintMine(address to, string memory tokenURI) public returns (uint256) {
        _tokenIds++;
        _mint(to, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        return _tokenIds;
    }
}
