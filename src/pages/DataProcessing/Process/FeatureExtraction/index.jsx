import React, { Component } from 'react';
import TableExtraction from '../../../FeatureExtraction/FeatureExtraction/TableExtraction/index' 
export default class FeatureExtraction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="FeatureExtraction">
      <TableExtraction />
      </div>
    );
  }
}