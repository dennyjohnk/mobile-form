import React from "react";
import Button from "react-bootstrap/Button";

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 40 };
  }

  handleClick = () => {
    console.log("clicked");
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
  };
  render() {
    return (
      <Button
        type="submit"
        value="Submit"
        variant="outline-primary"
        onClick={this.handleClick}
      >
        {this.state.counter}
      </Button>
    );
  }
}

export default SubmitButton;
