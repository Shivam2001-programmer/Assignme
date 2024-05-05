// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ClassDetails from "./components/ClassDetails";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/class/:id" element={<ClassDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
