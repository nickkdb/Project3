import React from "react";
import "../styles/style.css";
import { Button } from "react-bootstrap";
import { auth } from "../utils/firebase";
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";

function ProfileBanner(props) {
  const location = useLocation();
  // console.log(location.pathname)
  return (
    <div>
      <div className="banner">
        <div className="container">
          <div className="row">
            <h1 className="pageTitle">{props.pageTitle}</h1>
          </div>
          <div className="row">
            <div className="col-md-5">
              <img
                className="profile"
                src={props.fbImage ? props.fbImage : props.avatar}
                alt="profile"
              ></img>
            </div>
            <div className="col-md-7 profileInfo">
              <div className="row">
                <>
                {location.pathname === "/profile" ?
                  <Button
                    className="sign-outBtn mr-2"
                    onClick={() => {
                      props.updatePicButton();
                    }}
                  >
                    Update Profile Pic
                  </Button>
                  :
                  ""
                }
                </>
                <Button
                  className="btn btn-primary sign-outBtn"
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  <Link to="/">
                  Sign Out
                  </Link>
                </Button>
              </div>
              <div className="row">
                <h5>{props.email}</h5>
              </div>
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
