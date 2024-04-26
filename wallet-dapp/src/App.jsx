// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import WalletConnect from "./components/WalletConnect";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Welcome />
      <WalletConnect />
      <Footer />
    </div>
  );
}

export default App;
