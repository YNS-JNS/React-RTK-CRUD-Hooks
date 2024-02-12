import React from 'react';
/* - Bootstrap _________________________ */
import 'bootstrap/dist/css/bootstrap.min.css';
/* - Packages __________________________ */
import { Routes, Route, Link } from "react-router-dom";
/* - Styles ____________________________ */
import "./App.css";
/* - Components ________________________ */
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
/* _____________________________________ */

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand ml-4">
          Kooder Js
        </a>
        <div className="navbar-nav ms-auto mr-4">
          <div className="vr"></div>
          <li className="nav-item pr-4 pl-4">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <div className="vr"></div>
          <li className="nav-item pr-4 pl-4">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TutorialsList />} />
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/add" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;