import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Case extends Component {
  static propTypes = {
    value: PropTypes.any,
    values: PropTypes.any
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
