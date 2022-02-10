import React, { useState } from "react";
import Navbar from "./components/Navbar";
import People from "./components/People";
import Planets from "./components/Planets";
import logo from "./image/headlogo.png"


function App() {
  const [page, setPage] = useState("planets")
  return (
    <div className="App">
      <img src={logo} alt="siteLogo" className="brand"/>
      <Navbar setPage={setPage} />
      <div className="content">
        {page === "planets" ? <Planets /> : <People />}
      </div>
    </div>
  );
}

export default App;
