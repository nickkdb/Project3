import React from "react";
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { NavLink } from "react-router-dom";


//==================Images====================
import logo from "../images/logo74KBblack.png"
//============================================


function NavTabs() {

  return (
    <div>
      <Navbar bg="#2f4f4f" expand="lg">
        <Navbar.Brand><img src={logo} alt="ner herred logo" className="logo-small"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavItem>
              <NavLink className="nav-link" to="/">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="#">Search</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="#">Dashboard</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="" target="_blank" rel="noreferrer"><button type="button" className="view-btn">Sign Up</button></NavLink>
            </NavItem>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavTabs;