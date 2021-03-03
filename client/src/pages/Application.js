import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from 'react-notifications-component';
import UserContext from "../utils/UserContext";
import { socketContext } from "../utils/socketContext";
import Nav from "../components/Nav"
import Footer from "../components/Footer"

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";

import Search from "./Search";
import Dashboard from "./Dashboard"
import Home from "./Home"
import OtherProfile from "./OtherProfile";
import Trade from "./Trade";
import Messages from "./Messages";

function Application() {
  const user = useContext(UserContext);
  const socket= useContext(socketContext);

  const style= {
    color: "white !important",
    textDecoration: "underline"
  }

  useEffect(() => {
    socket.on("notification", data => {
      if (data.receiver === user.displayName) {
          store.addNotification({
            title: "Alert",
            message: ( 
              <>
              <p>You have a new message from {data.sender}</p>
              <a style={style} href="/messages">go there now</a>
              </>
             ),
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              pauseOnHover: true,
              click: false,
              showIcon: true
            }
          });
      }
    });

    return function cleanup() {socket.off("notification")}
  })
 


  return (
    user ?
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/profile/:id">
            <OtherProfile />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/messages">
            <Messages />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route>
            <Trade exact path="/trade"/>
          </Route>
        </Switch>
        <Footer />
      </Router>
      :
      <Router>
        <Route exact path="/">
          <Home />
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
      </Router>
  );
}



export default Application;