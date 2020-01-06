import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab,Table } from '@alifd/next';
import data from './data';
import {Button} from '@alifd/next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

let i=10000;
export default class ModelCheckTable extends Component {
  static displayName = 'ModelCheckTable';
 
  static propTypes = {};

  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource:data
    };
    this.columns = [
      
      {
        title: '模型名称',
        dataIndex: 'dataSetName',
        key: 'name',
      },
      {
        title: '算法',
        dataIndex: 'algorithm',
        key: 'algorithm',
      },
      {
        title: '神经元个数',
        dataIndex: 'neuronsNumber',
        key: 'neuronsNumber',
      },
      {
        title: '卷积层数',
        dataIndex: 'convolutionalLayers',
        key: 'convolutionalLayers',
      },
      
    ];
  }
  rowSelection = (selectedRowKeys, records) => {
    this.setState({
      rowkey: selectedRowKeys,
  });
    this.props.chooseRow(selectedRowKeys, records)
}
 
  render() {
    return (
        <div>
            
            <Table dataSource={this.state.dataSource}
                    rowSelection={{
                        mode: 'single',
                        onChange: this.rowSelection
                    }}
                >
                    <Table.Column title="数据集名称" dataIndex="dataSetName" width={150} />
                    <Table.Column title="算法" dataIndex="algorithm" width={150} />
                    <Table.Column title="神经元个数" dataIndex="neuronsNumber" width={150} />
                    <Table.Column title="卷积层数" dataIndex="convolutionalLayers" width={150} />
                    <Table.Column title="池化层数" dataIndex="poolingLayers" width={150} />
                    <Table.Column title="学习率" dataIndex="learningRate" width={150} />
                    <Table.Column title="训练时间" dataIndex="trainingTime" width={150} />
                    
                </Table>
        </div>
    );
  }
}
