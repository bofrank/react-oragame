import React from "react";
import Search from "./components/Search.jsx";
import bgImage from "./assets/cabinet-contemporary-counter-1080721.jpg";

function App() {
  return (
    <div className="App">
      <div id="hero-bg">
          <div
            className="bg"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
            <Search />
        </div>      
    </div>
  );
}

export default App;