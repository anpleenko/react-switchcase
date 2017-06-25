import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Default extends Component {
  render() {
    const { children } = this.props;
    return children;
  }
}
