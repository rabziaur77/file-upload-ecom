import { Container, Row, Col } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import ConfirmPopup from "./confirmPopup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CommonCss/CommonCssStyle.css";

const Layout = ({ children }) => {
  const { isPopupShow, message } = useSelector((state) => state.popup);
  const { isConfirmShow, messages, onConfirm } = useSelector(
    (state) => state.confirm
  );

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
      {isConfirmShow && (
        <ConfirmPopup messages={messages} onConfirm={onConfirm} />
      )}
    </div>
  );
};

export default Layout;
