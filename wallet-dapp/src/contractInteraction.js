import Web3 from 'web3';
import TreasureBlox from '../../artifacts/contracts/TreasureBlox.sol/TreasureBlox.json';

const contractAddress = '0xeEB58C5dab67D30F58Dd71506b942Aa61BA1a62d'; // TreasureBlox contract address
const contractABI = TreasureBlox.abi; // ABI extraction from the JSON file

// Connect to the Ethereum network
const web3 = new Web3(window.ethereum);

console.log('Contract ABI:', contractABI);

// Instantiate the contract correctly using the ABI
const treasureBloxContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to get balance from the contract
export const getTokenBalance = async (userAccount) => {
    try {
      const balance = await treasureBloxContract.methods.balanceOf(userAccount).call();
      return balance;
    } catch (error) {
      console.error('Error retrieving TBX token balance:', error);
      throw error;
    }
  };

// Function to deposit funds into the contract
export const deposit = async (amount, senderAddress) => {
  try {
    const receipt = await treasureBloxContract.methods.deposit(amount).send({ from: senderAddress });
    return receipt;
  } catch (error) {
    console.error('Error depositing funds:', error);
    throw error;
  }
};
