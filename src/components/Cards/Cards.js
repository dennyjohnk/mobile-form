import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Container, Row, Col } from "react-bootstrap";
import "./Cards.css";

class MediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.ticketCategoryId = "";
  }

  getIconClass = icon => {
    let iconName = icon ? icon : "fa-wrench";
    let iconClass = "fa fa-2x " + iconName;
    return iconClass;
  };

  renderCards = () => {
    let ticketCategory = this.props.model;
    let element = ticketCategory.map(m => {
      let name = m.shortName;
      let id = m.id;
      let icon = m.icon;

      return (
        <Col
          className="category-card-container"
          md={{ span: 4 }}
          xs={{ span: 6 }}
          key={id}
        >
          <Card
            onClick={this.onCategoryClick.bind(this, m)}
            id={"category-card-" + id}
          >
            <CardContent>
              <i className={this.getIconClass(icon)} />
              <div className="category-card-title">
                <p className="margin-bottom-0 category-card-title-text">
                  {name}
                </p>
              </div>
            </CardContent>
          </Card>
        </Col>
      );
    });
    return element;
  };

  onCategoryClick = element => {
    if (this.state.ticketCategoryId) {
      document.getElementById(
        "category-card-" + this.state.ticketCategoryId
      ).style.backgroundColor = "#fff";
    }
    this.setState({ ticketCategoryId: element.id }, () => {
      document.getElementById(
        "category-card-" + element.id
      ).style.backgroundColor = "rgb(236, 236, 236)";
      if (this.props.cardsPropHandler)
        this.props.cardsPropHandler(this.state.ticketCategoryId);
    });
  };

  render() {
    return (
      <Container>
        <Row>{this.renderCards()}</Row>
      </Container>
    );
  }
}

export default MediaCard;
