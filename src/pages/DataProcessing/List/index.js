import React, { Component } from 'react';
import ModelCards from './ModelCards/index';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="List">
        <ModelCards />
      </div>
    );
  }
}
