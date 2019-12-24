import React, { Component } from 'react';
import InfoDisplayTable from './components/InfoDisplayTable';

export default class FileTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="FileTable">
        {/* 两栏信息展示型表格 */}
        <InfoDisplayTable  id={this.props.id}/>
      </div>
    );
  }
}
