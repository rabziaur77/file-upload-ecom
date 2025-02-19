import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import '../CommonModules/CommonCss/CommonCssStyle.css'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [openDashboard, setOpenDashboard] = useState(false);
    const [openBootstrap, setOpenBootstrap] = useState(false);
  
    return (
      <div className="pt-2">
        <div>
          <Link to={"/"}>
          <img src='http://www.accurateappsolution.com/assets/img/logo.png' />
          </Link>
        </div>
        <Nav className="flex-column">
          <Nav.Link onClick={() => setOpenDashboard(!openDashboard)}>
            Model
          </Nav.Link>
          <Collapse in={openDashboard}>
            <div className='submenu-master'>
                <Link className='nav-link' to={"/"}>Add New Model</Link>
                <Link className='nav-link' to={"/model-list"}>Models</Link>
            </div>
          </Collapse>
          <Nav.Link onClick={() => setOpenBootstrap(!openBootstrap)}>
            Cover
          </Nav.Link>
          <Collapse in={openBootstrap}>
          <div className='submenu-master'>
                <Link className='nav-link' to={"/add-cover"}>Add New Cover</Link>
                <Link className='nav-link' to={"/cover-list"}>Covers</Link>
            </div>
          </Collapse>
          <Link className='nav-link' to={"/csv-by-model"}>Csv By Model</Link>
        </Nav>
      </div>
    );
  };

  export default Sidebar;
  