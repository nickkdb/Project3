import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Dashboard from "./components/pages/Dashboard";


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path={["/search"]} component={Search} />
        <Route exact path={["/dashboard"]} component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
