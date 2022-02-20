import "./App.css";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";

//components
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    //Quand je veux me connecter, je ferais un setUser("20DJKN3NCJCK3N3N3?NCC")
    //Quand je veux me déconnecter, je ferais un setUser(null)

    if (token !== null) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }

    setToken(token);
  };
  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/publish" element={<Publish token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
