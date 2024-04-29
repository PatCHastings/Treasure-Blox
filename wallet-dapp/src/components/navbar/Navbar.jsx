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
          <a href="#welcome">Home</a>
        </li>
        <li>
          <a href="#mines">Mines</a>
        </li>
        <li>
          <a href="#forge">Forge</a>
        </li>
        <li>
          <a href="#market">Market</a>
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
