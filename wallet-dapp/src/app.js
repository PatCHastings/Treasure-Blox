import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TreasureBlox from '../../artifacts/contracts/TreasureBlox.sol/TreasureBlox.json';

const contractAddress = '0xeEB58C5dab67D30F58Dd71506b942Aa61BA1a62d';
const contractABI = TreasureBlox.abi;

function WalletConnect() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    connectWalletOnLoad();
  }, []);

  async function connectWalletOnLoad() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
        }
      } catch (error) {
        console.error('Error on loading MetaMask:', error);
      }
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
      } catch (error) {
        console.error('Error on connecting MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  }

  async function updateBalance(userAccount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(userAccount);
    setBalance(ethers.utils.formatEther(balance));
  }

  async function deposit() {
    const amount = prompt('Enter the amount to deposit');
    if (amount) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
      try {
        const tx = await contract.deposit({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
        updateBalance(account);
      } catch (error) {
        console.error('Error on deposit:', error);
      }
    }
  }

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
      {account && <div>
        <p>Balance: {balance} ETH</p>
        <button onClick={deposit}>Deposit</button>
      </div>}
    </div>
  );
}

export default WalletConnect;
