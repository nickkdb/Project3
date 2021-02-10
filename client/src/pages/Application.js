import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "../utils/UserContext";
import Nav from "../components/Nav"
import Footer from "../components/Footer"

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";

import Search from "./Search";
import Dashboard from "./Dashboard"
import Home from "./Home"

function Application() {
  const user = useContext(UserContext);

  return (
    user ?
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <ProfilePage />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
        <Footer />
      </Router>
      : 
      <Router>
       <Nav />
      <Route exact path="/">
         <SignIn />
      </Route>
        <Switch>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/signIn">
            <SignIn />
          </Route>
          <Route exact path="/passwordReset">
            <PasswordReset />
          </Route>
        </Switch>
        <Footer />
      </Router>
  );
}



export default Application;