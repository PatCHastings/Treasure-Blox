// src/App.jsx
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Welcome from "./components/Welcome";
import WalletConnect from "./components/walletConnect/WalletConnect";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Welcome />
      <Footer />
    </div>
  );
}

export default App;
