import React from "react";
import MapComponent from "./components/MapComponent";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Map Dashboard</h1>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
