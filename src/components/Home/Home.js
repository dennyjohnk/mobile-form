import React from "react";
import "./Home.css";
import Header from "../Header/Header";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    const data = new FormData(event.target);
    console.log(data, event.target);
    event.preventDefault();
  }

  render() {
    return [<Header key="1" />];
  }
}

export default InputForm;
