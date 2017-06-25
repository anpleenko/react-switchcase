import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Case from './Case';

const isDefined = x => typeof x !== 'undefined';
const isCase = x => x instanceof Case;
const isCaseArray = x => (x instanceof Array) && x.filter(isCase).indexOf(false) === -1;

export default class Switch extends Component {
  static propTypes = {
    condition: PropTypes.any.isRequired,
  }

  static select(condition, cases) {
    for (let i = 0; i < cases.length; i++) {
      const c = cases[i];
      const { value, values } = c.props;
      if (isDefined(values) && values.indexOf(condition) > -1) {
        return c;
      } else if (isDefined(value) && value === condition) {
        return c;
      }
    }

    return null;
  }

  static getCases(children) {
    if (isCaseArray(children)) {
      return children;
    } else if (isCase(children)) {
      return [children];
    }

    const name = children.constructor.name;
    throw new TypeError(`Expected instance of Case but got ${name}`);
  }

  render() {
    const { children, condition } = this.props;
    const cases = Switch.getCases(children);
    const result = Switch.select(condition, cases);

    const defaultChildren = React.Children.map(children, e => {
      if (e.type.displayName === 'Default') return e;
    });

    if (defaultChildren.length > 1) throw new TypeError('Expected one Default element');
    if (result) return result;
    if (defaultChildren.length) return React.Children.only(defaultChildren[0]);

    return null;
  }
}
