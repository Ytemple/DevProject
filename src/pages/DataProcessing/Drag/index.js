import React, { Component } from 'react';
import BoardList from './components/BoardList';

export default class Page18 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Drag">
        {/* TODO 任务管理面板，可拖拽排序 */}
        <BoardList />
      </div>
    );
  }
}
