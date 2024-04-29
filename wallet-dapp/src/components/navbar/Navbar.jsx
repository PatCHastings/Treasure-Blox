import React, { useState } from "react";
import WalletConnect from "../walletConnect/WalletConnect";
import WalletHUD from "../hud/WalletHUD";
import "./navbar.scss";

function Navbar() {
  const [showHUD, setShowHUD] = useState(false);

  const toggleWalletHUD = () => {
    setShowHUD(!showHUD);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
      </ul>
      <button onClick={toggleWalletHUD}>Connect Wallet</button>
      <WalletHUD isVisible={showHUD} closeHUD={() => setShowHUD(false)}>
        <WalletConnect />
      </WalletHUD>
    </nav>
  );
}

export default Navbar;
