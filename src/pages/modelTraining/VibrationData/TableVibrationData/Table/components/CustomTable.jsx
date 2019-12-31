import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@alifd/next';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';
/** 
  static propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array.isRequired,
  };
*/
  static defaultProps = {
    dataSource: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  renderColumns = () => {
    const { columns } = this.props;
    return columns.map((item) => {   //注意这儿map的是每一个columns里面的数据
      if (typeof item.render === 'function') {
        return (
          <Table.Column
            key={item.key}
            title={item.title}
            cell={item.render}
            width={item.width || 350}
          />
        );
      }

      return (
        <Table.Column
          key={item.key}
          title={item.title}
          dataIndex={item.dataIndex}  //每一个item都有对应的dataindex，通过这个index来匹配相应的数据
          width={item.width || 250}
        />
      );
    });
  };

  render() {
    return <Table {...this.props}>{this.renderColumns()}</Table>;
  }
}
