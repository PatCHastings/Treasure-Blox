import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.scss";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Navbar from "./components/navbar/Navbar";
import Welcome from "./components/welcome/Welcome";
import Mines from "./components/mines/Mines";
import Forge from "./components/forge/Forge";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/mines" element={<Mines />} />
            <Route path="/forge" element={<Forge />} />
            {/* Add additional routes here */}
          </Routes>
        </div>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
