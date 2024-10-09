/**
 * This mock is to prevent jest pulling redundant heavy packages
 */
import React from 'react';

const MockIcon = props => <div {...props} icon={{}} />;

module.exports = new Proxy(
  {},
  {
    get() {
      return MockIcon;
    },
  }
);
