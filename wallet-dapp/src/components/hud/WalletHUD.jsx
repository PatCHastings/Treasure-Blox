import React from "react";
import "./walletHUD.scss";

function WalletHUD({ isVisible, closeHUD, children }) {
  return (
    <div className={`wallet-hud ${isVisible ? "visible" : ""}`}>
      {children}
      <button className="close-hud" onClick={closeHUD}>
        Close
      </button>
    </div>
  );
}

export default WalletHUD;
