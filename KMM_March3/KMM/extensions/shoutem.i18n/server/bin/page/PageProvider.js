import PropTypes from 'prop-types';
import React, { Component, Children } from 'react';

export default class PageProvider extends Component {
  getChildContext() {
    const { page } = this.props;
    return { page };
  }

  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}

PageProvider.propTypes = {
  page: PropTypes.object,
  children: PropTypes.node,
};

PageProvider.childContextTypes = {
  page: PropTypes.object,
};
