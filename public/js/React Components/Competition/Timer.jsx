import React, { Component } from 'react';
import PropTypes from 'prop-types';

const moment = require('moment');
const prettyMs = require('pretty-ms');

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      elapsed: 0,
      timing: 0,
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // this.setState({ start: this.props.start });
    this.timer = setInterval(this.tick, 13);
  }

  componentWillUpdate() {
    if (this.props.done === true) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ elapsed: new Date() - this.props.start });
  }

  render() {
    const pretty = prettyMs(this.state.elapsed, { verbose: true });
    const totalMSeconds = this.state.elapsed;
    const hour = (`0${Math.floor(totalMSeconds / 3600000)}`.slice(-2));
    const minute = (`0${  Math.floor((totalMSeconds - hour * 3600000) / 60000)}`.slice(-2));
    const seconds = (`0${Math.floor((totalMSeconds - (hour * 3600000 + minute * 60000)) / 1000)}`.slice(-2));
    const milliseconds = (`0${  Math.floor(totalMSeconds - (hour * 3600000 + minute * 60000 + seconds * 1000))}`.slice(-2));

    return (
      <div id="timer">
        <h2 id="timer2"> {hour} : {minute} : {seconds} : {milliseconds} </h2>
      </div>
    );
  }
}

Timer.propTypes = {
  done: PropTypes.bool.isRequired,
};
