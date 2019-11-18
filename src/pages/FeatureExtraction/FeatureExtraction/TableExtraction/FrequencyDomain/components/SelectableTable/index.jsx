import React, { Component } from 'react';
import { Table, Button, Icon, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const getMockData = () => {
  const result = [
    {
      id: 1,
      title: {
        name:'重心频率',
      },
    },
    {
      id: 2,
      title: {
        name:'均方频率',
      },
    },
    {
      id: 3,
      title: {
        name:'均方根频率',
      },
    },
    {
      id: 4,
      title: {
        name:'频率方差',
      },
    },
    {
      id: 5,
      title: {
        name:'频率标准差',
      },
    },
  ];
  return result;
};

// 注意：下载数据的功能，强烈推荐通过接口实现数据输出，并下载
// 因为这样可以有下载鉴权和日志记录，包括当前能不能下载，以及谁下载了什么

export default class SelectableTable extends Component {
  static displayName = 'SelectableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids) => {
        console.log('ids', ids);
        this.setState({
          selectedRowKeys: ids,
        });
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records);
      },
      // 支持针对特殊行进行定制
      getProps: (record) => {
        return {
          disabled: record.id === 100306660941,
        };
      },
    };
    this.state = {
      selectedRowKeys: [],
      dataSource: getMockData(),
    };
  }

  render() {
    return (
      <div className={`${styles.selectableTable} selectable-table`} >
       
        <IceContainer>
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            rowSelection={{
              ...this.rowSelection,
              selectedRowKeys: this.state.selectedRowKeys,
            }}
          >
            <Table.Column title="频域处理参数选择" dataIndex="title.name" width={350} />
           
          </Table>
         
        </IceContainer>
      </div>
    );
  }
}


