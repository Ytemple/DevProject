import React, { Component } from 'react';
import TabTable from './components/TabTable';
import Table2 from '../../../../Preprocessing/Preprocessing/Table2/index'
export default class TableInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page2-page">
        <Table2 />
      </div>
    );
  }
}
