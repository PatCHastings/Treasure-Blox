/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();

console.log(`Private Key: ${process.env.PRIVATE_KEY}`); // Check the output

module.exports = {
  solidity: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: "D1IFY7ZEZVXYZKVKN5KQ7ED8ETTY88C1RN",
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    scripts: "./scripts",
  },
};

