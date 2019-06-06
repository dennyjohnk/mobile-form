import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./Form.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class RadioButtonsGroup extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.name = null;
  }

  requiredSymbolInsert = data => {
    if (data) return " *";
    else return "";
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  onChange = (e, key, type = "single") => {
    //console.log(`${key} changed ${e.target.value} type ${type}`);
    if (type === "single") {
      this.setState({
        [key]: e.target.value
      });
    } else if (type === "checkbox") {
      this.setState({
        [key]: e.target.checked
      });
    } else {
      // Array of values (e.g. checkbox): TODO: Optimization needed.
      let found = this.state[key]
        ? this.state[key].find(d => d === e.target.value)
        : false;

      if (found) {
        let data = this.state[key].filter(d => {
          return d !== found;
        });
        this.setState({
          [key]: data
        });
      } else {
        this.setState({
          [key]: [e.target.value, ...this.state[key]]
        });
      }
    }
  };

  renderForm = () => {
    let model = this.props.model;

    let formUI = model.map(m => {
      let key = m.field_type_id;
      let type = m.field_type || "text";
      let props = m.props || {};
      let name = m.name;
      let value = m.value;
      let placeholder = m.field_placeholder;
      let disabled = m.field_disabled;
      let required = m.field_required;
      let label = m.field_label;
      let options = m.field_options;
      let field_id = m.field_type_id;

      let target = key;
      value = this.state[target];

      let input = (
        <input
          {...props}
          className="form-input"
          type={type}
          key={key}
          name={name}
          value={value}
          onChange={e => {
            this.onChange(e, target);
          }}
        />
      );
      /** Start subject */
      if (field_id === 126 && type === "static") {
        return (
          <Form.Group key={key}>
            <Form.Label>
              {label} {this.requiredSymbolInsert(required)}
            </Form.Label>
            <Form.Control
              id={name}
              name={name}
              type="text"
              placeholder={placeholder}
              required={required}
              onChange={e => {
                this.onChange(e, target);
              }}
            />
          </Form.Group>
        );
      }
      /** end subject */

      /** Start description */
      if (field_id === 127 && type === "static") {
        return (
          <Form.Group key={key}>
            <Form.Label>
              {label} {this.requiredSymbolInsert(required)}
            </Form.Label>
            <Form.Control
              row="3"
              id={name}
              name={name}
              as="textarea"
              placeholder={placeholder}
              required={required}
              onChange={e => {
                this.onChange(e, target);
              }}
            />
          </Form.Group>
        );
      }
      /** end description */

      /** Start email */
      if (type === "email" && !disabled) {
        return (
          <Form.Group key={key}>
            <Form.Label>
              {label} {this.requiredSymbolInsert(required)}
            </Form.Label>
            <Form.Control
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              required={required}
              onChange={e => {
                this.onChange(e, target);
              }}
            />
          </Form.Group>
        );
      }
      /** end email */

      /** Start single line input */
      if (type === "textfield" && !disabled) {
        return (
          <Form.Group key={key}>
            <Form.Label>
              {label}
              {this.requiredSymbolInsert(required)}
            </Form.Label>
            <Form.Control
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              required={required}
              onChange={e => {
                this.onChange(e, target);
              }}
            />
          </Form.Group>
        );
      }
      /** end single line input */

      /** Start date input */
      if (type === "date" && !disabled) {
        return (
          <Form.Group key={key}>
            <Form.Label>
              {label}
              {this.requiredSymbolInsert(required)}
            </Form.Label>
            <Form.Control
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              required={required}
              onChange={e => {
                this.onChange(e, target);
              }}
            />
          </Form.Group>
        );
      }
      /** end date input */

      /** Start checkbox */
      if (type === "checkbox" && !disabled) {
        return (
          <Form.Group key={key}>
            <Form.Check
              id={name}
              name={name}
              type={type}
              label={label}
              required={required}
              onChange={e => {
                this.onChange(e, key, "checkbox");
              }}
            />
          </Form.Group>
        );
      }
      /** end checkbox */

      /** Start textarea */
      if (type === "textarea" && !disabled) {
        return (
          <Form.Group key={key}>
            <Form.Label>
              {label} {this.requiredSymbolInsert(required)}
            </Form.Label>
            <Form.Control
              as={type}
              rows="3"
              placeholder={placeholder}
              required={required}
              onChange={e => {
                this.onChange(e, key, "single");
              }}
            />
          </Form.Group>
        );
      }
      /** end textarea */

      /** Start dropdown */
      if (type === "dropdown" && !disabled) {
        let selectOptions = options.map(o => {
          return (
            <option value={o.option_title} key={o.option_id}>
              {o.option_title}
            </option>
          );
        });

        return (
          <Form.Group key={key}>
            <Form.Label>
              {label}
              {this.requiredSymbolInsert(required)}
            </Form.Label>
            <Form.Control
              as="select"
              placeholder={placeholder}
              required={required}
              onChange={e => {
                this.onChange(e, key, "single");
              }}
            >
              <option value=""> --- </option>
              {selectOptions}
            </Form.Control>
          </Form.Group>
        );
      }

      /** end dropdown */

      /** Start radio */
      if (type === "radio") {
        let radioOptions = options.map(o => {
          return (
            <Form.Check
              type="radio"
              label={o.option_title}
              name={key}
              required={required}
              id={key}
              key={o.option_id}
              value={o.option_title}
              onChange={e => {
                this.onChange(e, key, "single");
              }}
            />
          );
        });

        return (
          <Form.Group as={Row} key={key}>
            <Form.Label as="legend" column sm={10}>
              {label} {this.requiredSymbolInsert(required)}
            </Form.Label>
            <Col sm={10}>{radioOptions}</Col>
          </Form.Group>
        );
      }

      /** end radio */

      return <div key={"g" + key} className="form-group" />;
    });
    return formUI;
  };

  render() {
    return (
      <Row>
        <Col className="form-contatiner">
          <div className="create-ticket-form">
            <Form
              onSubmit={e => {
                this.onSubmit(e);
              }}
              name="creatTicketForm"
              id="createTicketForm"
            >
              {this.renderForm()}

              <div className="button-centered">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);
