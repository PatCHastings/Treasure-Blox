import React, { useState } from "react";
import { useSelector } from "react-redux";
import WalletConnect from "../walletConnect/WalletConnect";
import WalletHUD from "../hud/WalletHUD";
import "./navbar.scss";

function Navbar() {
  const address = useSelector((state) => state.user.address);
  const [showHUD, setShowHUD] = useState(false);

  const toggleWalletHUD = () => {
    setShowHUD(!showHUD);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="#welcome">Play</a>
        </li>
        <li>
          <a href="#mines">Mines</a>
        </li>
        <li>
          <a href="#forge">Forge</a>
        </li>
      </ul>
      <button onClick={toggleWalletHUD}>
        {address ? "Wallet Connected" : "Connect Wallet"}
      </button>
      <WalletHUD isVisible={showHUD} closeHUD={() => setShowHUD(false)}>
        <WalletConnect />
      </WalletHUD>
    </nav>
  );
}

export default Navbar;
