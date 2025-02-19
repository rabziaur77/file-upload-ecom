import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import "./CommonCss/CommonCssStyle.css";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <div>
            <AdminNavbar />
            <Container fluid>
                <Row>
                    <Col md={3} xl={2} className="text-white side-master">
                        <Sidebar />
                    </Col>
                    <Col md={9} xl={10} className="px-md-4 ml-sm-auto pt-md-3 body-master">
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Layout;
