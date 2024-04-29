import React, { useState, useEffect } from "react";
import "./walletConnect.scss";
import { ethers } from "ethers";
import TreasureBlox from "../../../../artifacts/contracts/TreasureBlox.sol/TreasureBlox.json";

const contractAddress = "0xeEB58C5dab67D30F58Dd71506b942Aa61BA1a62d";
const contractABI = TreasureBlox.abi;

function WalletConnect() {
  const [account, setAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [tbxBalance, setTbxBalance] = useState("");

  useEffect(() => {
    connectWalletOnLoad();
  }, []);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const updateBalance = async (userAccount) => {
    try {
      const ethBalance = await provider.getBalance(userAccount);
      setEthBalance(ethers.utils.formatEther(ethBalance));

      const tbxRawBalance = await contract.balanceOf(userAccount);
      setTbxBalance(ethers.utils.formatUnits(tbxRawBalance, 18)); // assuming TBX is an 18 decimal token
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  async function connectWalletOnLoad() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
        }
      } catch (error) {
        console.error("Error on loading MetaMask:", error);
      }
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
      } catch (error) {
        console.error("Error on connecting MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  }

  async function disconnectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        setAccount("");
        setEthBalance("");
        setTbxBalance("");
      } catch (error) {
        console.error("Error on disconnecting MetaMask:", error);
      }
    }
  }

  return (
    <div>
      <button className="connectWallet" onClick={connectWallet}>
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>
      {account && (
        <div className="walletDetails">
          <p>Balance: {ethBalance} ETH</p>
          <p>Balance: {tbxBalance} TBX</p>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
