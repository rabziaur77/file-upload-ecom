import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./CommonCss/CommonCssStyle.css";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup } from "../../redux/popupslice";

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const {isPopupShow, message} = useSelector((state) => state.popup);
// const hideMessage=()=>{
//     dispatch(hidePopup())
// }
    return (
        <div>
            <AdminNavbar />
            <Container fluid>
                <Row>
                    <Col md={3} xl={2} className="text-white side-master">
                        <Sidebar />
                    </Col>
                    <Col
                        md={9}
                        xl={10}
                        className="px-md-4 ml-sm-auto pt-md-3 body-master"
                    >
                        {children}
                    </Col>
                </Row>
            </Container>
            {isPopupShow && (
                <div className="popup">
                    <div className="popupBody">
                    <div className="closeOpt">
                        {/* <button onClick={hideMessage}>x</button> */}
                    </div>
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
