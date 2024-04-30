// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Navbar from "./components/navbar/Navbar";
import Welcome from "./components/Welcome";
import WalletConnect from "./components/walletConnect/WalletConnect";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Welcome />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
