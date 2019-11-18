import React, { Component } from 'react';
import TabTable from './components/TabTable';

export default class TableInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page2-page">
        <TabTable />
      </div>
    );
  }
}
