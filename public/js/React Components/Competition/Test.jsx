import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText  } from 'material-ui';

export default class Test extends Component {
  componentDidMount() {
    try {
      eval(`${this.props.userInput}; ${this.props.test};`);
    } catch (e) {
      eval(`${this.props.test};`);
    }
  }

  componentDidUpdate() {
    this.mocha.innerHTML = '';
    try {
      eval(`${this.props.userInput}; ${this.props.test};`);
    } catch (e) {
      eval(`${this.props.test};`);
    }
  }

  render() {
    return (
      <Card>
        <CardText>
          <div id="mocha" ref={(mocha) => { this.mocha = mocha; }} style={{ margin: 0 }} />
        </CardText>
      </Card>
    );
  }
}

Test.propTypes = {
  test: PropTypes.string.isRequired,
  userInput: PropTypes.string.isRequired,
};
