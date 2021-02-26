import React from "react";
import "../styles/style.css"
import { Button } from "react-bootstrap"
import { auth } from "../utils/firebase";

function ProfileBanner(props) {
  return (
    <div>
      <div className="banner">
        <div className="container">
          <div className="row">
            <h1 className="pageTitle">{props.pageTitle}</h1>
          </div>
          <div className="row">
            <div className="col-md-5">
              <img className="profile" src={props.fbImage ? props.fbImage : props.avatar} alt="profile"></img></div>
            <div className="col-md-7 profileInfo">
              <div className="row">
                <Button className="sign-outBtn" onClick={() => { auth.signOut(); }}>Sign Out</Button></div>
                <div className="row">
                <h5>{props.email}</h5></div>
                <div className="row">
                <h5>ID: {props.userId}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;

