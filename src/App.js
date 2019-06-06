import React from "react";
import "./App.css";
import CategoryCard from "./components/Cards/Cards";
import Header from "./components/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import DynamicForm from "./components/Form/Form";
import { API_ENDPOINT, ROLE_ID } from "./api/api-config";
import LoadingSpinner from "./components/Spinner/Spinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.name = "";
  }
  state = {
    ticketCategory: [],
    data: [],
    ticketCategoryId: "",
    isLoaded: false,
    title: "",
    logo: "",
    fetchInProgress: false
  };
  componentDidMount() {
    fetch(API_ENDPOINT.base + API_ENDPOINT.formApi + ROLE_ID.formId)
      .then(response => response.json())
      .then(response => {
        this.setState({ data: response });
      })
      .then(() => {
        return fetch(
          API_ENDPOINT.base +
            API_ENDPOINT.ticketCategoryApi +
            ROLE_ID.categoryId
        );
      })
      .then(response => response.json())
      .then(response => {
        this.setState({ ticketCategory: response });
      })
      .then(() => {
        return fetch(API_ENDPOINT.base + API_ENDPOINT.themeApi);
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          title: response.name,
          logo: response.logo,
          isLoaded: true,
          fetchInProgress: true
        });
      });
  }
  /**
   * Method to Generate Unique ID
   */
  makeId = () => {
    let length = 10;
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  /**
   * Check String Validity For ID-3
   */
  checkStringValidity = id3 => {
    let string = id3;
    let pattern = /^[a-zA-Z0-9_.-]+$/;

    if (pattern.test(string)) {
      return string;
    } else {
      return null;
    }
  };

  /**
   * Check Email Validity For ID-2
   */
  checkEmailValidity = (id1, id2) => {
    let number = id1;
    let email = id2;
    let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!pattern.test(email)) {
      return number + "@" + window.location.hostname;
    } else {
      return email;
    }
  };

  /**
   * Check Number Validity
   */
  checkNumberValidity = id1 => {
    let number = id1;
    if (isNaN(number)) return this.makeId();
    else return number;
  };

  /**
   * Generate the name field of the form
   */
  generateNameFeild = (id1, id3) => {
    let number = this.checkNumberValidity(id1);
    let string = this.checkStringValidity(id3);

    let data =
      (string ? string : "") + (string ? " - " : "") + (number ? number : "");
    console.log("name=", data, "id1=", number, "id3=", string);
    return [data, number];
  };

  /**
   * Form on submit method
   */
  onSubmit = model => {
    if (this.props.onSubmit) this.props.onSubmit(this.state);
    let ticketCategoryId = this.state.ticketCategoryId
      ? this.state.ticketCategoryId
      : null;
    if (!ticketCategoryId) {
      alert("Category is required");
      return;
    }

    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    let id1 = searchParams.get("id1") ? searchParams.get("id1") : "nonumber";
    let id2 = searchParams.get("id2") ? searchParams.get("id2") : null;
    let id3 = searchParams.get("id3") ? searchParams.get("id3") : null;

    let nameFieldData = this.generateNameFeild(id1, id3);
    let name = nameFieldData[0];
    let email = this.checkEmailValidity(nameFieldData[1], id2);

    let subject = model[126];
    let description = model[127];
    let customFields = [];

    delete model[126]; //deletes subject
    delete model[127]; //deletes desc

    Object.keys(model).forEach(e => {
      customFields.push({
        columnId: e,
        value: model[e]
      });
    });

    let object = JSON.stringify({
      attachmentId: [],
      contentType: "text/html",
      requestType: ticketCategoryId,
      subject: subject,
      description: description,
      name: name,
      email: email,
      custom: customFields
    });

    fetch(API_ENDPOINT.base + API_ENDPOINT.createTicketApi + ROLE_ID.formId, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: object
    })
      .then(() => {
        alert("Form submitted");
        this.setState({ isLoaded: true }, () => {});
        window.location.reload();
      })
      .catch(() => {
        this.setState({ isLoaded: true }, () => {});
        alert("Error");
      });
  };

  cardsPropHandler = model => {
    this.setState({ ticketCategoryId: model }, () => {});
  };

  render() {
    if (!this.state.isLoaded) {
      return <LoadingSpinner />;
    }
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md={{ span: 6 }} className="col-centered App-container">
              <Header title={this.state.title} logo={this.state.logo} />
              <CategoryCard
                model={this.state.ticketCategory}
                cardsPropHandler={model => this.cardsPropHandler(model)}
              />
              <DynamicForm
                model={this.state.data}
                onSubmit={model => {
                  this.onSubmit(model);
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
