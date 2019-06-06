import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Header.css";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let title = this.props.title;
    let logo = this.props.logo;
    return (
      <Container className="Tenant-info-container">
        <Row>
          <Col className="col-centered form-header">
            <div className="logo-container margin-bottom-10">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <h4>{title}</h4>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
