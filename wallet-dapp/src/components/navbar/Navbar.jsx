import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WalletConnect from "../walletConnect/WalletConnect";
import WalletHUD from "../hud/WalletHUD";
import "./navbar.scss";

function Navbar() {
  const address = useSelector((state) => state.user.address);
  const [showHUD, setShowHUD] = useState(false);
  const [visible, setVisible] = useState(true);

  const toggleWalletHUD = () => {
    setShowHUD(!showHUD);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/welcome">Play</Link>
        </li>
        <li>
          <Link to="/mines">Mines</Link>
        </li>
        <li>
          <Link to="/forge">Forge</Link>
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
