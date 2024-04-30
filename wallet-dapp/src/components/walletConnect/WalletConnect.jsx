import React, { useState, useEffect } from "react";
import "./walletConnect.scss";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { setUserAddress, setUserBalance } from "../../app/userReducer";
import TreasureBlox from "../../../../artifacts/contracts/TreasureBlox.sol/TreasureBlox.json";

const contractAddress = "0xeEB58C5dab67D30F58Dd71506b942Aa61BA1a62d";
const contractABI = TreasureBlox.abi;

function WalletConnect() {
  const [account, setAccount] = useState("");
  const ethBalance = useSelector((state) => state.user.ethBalance);
  const tbxBalance = useSelector((state) => state.user.tbxBalance);
  const address = useSelector((state) => state.user.address);
  const dispatch = useDispatch();

  useEffect(() => {
    connectWalletOnLoad();
  }, []);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const updateBalance = async (userAccount) => {
    try {
      const ethBalance = await provider.getBalance(userAccount);
      const tbxRawBalance = await contract.balanceOf(userAccount);
      dispatch(
        setUserBalance({
          ethBalance: ethers.utils.formatEther(ethBalance),
          tbxBalance: ethers.utils.formatUnits(tbxRawBalance, 18),
        })
      );
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
          dispatch(setUserAddress(accounts[0]));
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
        dispatch(setUserAddress(accounts[0]));
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
        dispatch(setUserAddress(""));
        dispatch(setUserBalance({ ethBalance: "", tbxBalance: "" }));
      } catch (error) {
        console.error("Error on disconnecting MetaMask:", error);
      }
    }
  }

  return (
    <div>
      <button className="connectWallet" onClick={connectWallet}>
        {address ? `Connected: ${address}` : "Connect Wallet"}
      </button>
      {address && (
        <div className="walletDetails">
          <p>Balance: {ethBalance} ETH</p>
          <p>Balance: {tbxBalance} TBX</p>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
