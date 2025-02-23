import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CommonModules/CommonCss/CommonCssStyle.css'
import { Navbar, Nav } from 'react-bootstrap';

const AdminNavbar = () => {

  const logout=()=>{
    window.localStorage.removeItem("session");
    window.location.href = "/";
  }

  return (
    <Navbar variant="dark" expand="lg" fixed="top" className="nav-bar-top">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-control ms-auto"> {/* Aligns items to the right */}
          <Nav.Link href="#" onClick={logout}>Log-Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
