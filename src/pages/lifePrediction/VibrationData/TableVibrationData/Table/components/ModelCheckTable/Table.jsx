import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab,Table,Pagination} from '@alifd/next';
import data from './data';
import {Button} from '@alifd/next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import store from '../../../../../../Store/index'
import $ from 'jquery'
import {headerToken,hostPort} from '../../../../../../../Common'

export default class ModelCheckTable extends Component {
  static displayName = 'ModelCheckTable';
 
  static propTypes = {};

  static defaultProps = {};
  
  constructor(props) {
    super(props);
    console.log('22:53',store.getState().ModelTrainingreducer.modelTrainingTable)
    this.state = {
      dataSource:store.getState().ModelTrainingreducer.modelTrainingTable,
      pageNumber: '', //页码
    };
    this.columns = [
      {
        title: '模型',
        dataIndex: 'modelName',
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
      {
        title: '池化层数',
        dataIndex: 'poolingLayers',
        key: 'poolingLayers',
      },
      {
        title: '学习率',
        dataIndex: 'learningRate',
        key: 'learningRate',
      },
      {
        title: '训练时间',
        dataIndex: 'trainingTime',
        key: 'trainingTime',
      },
    ];
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange=()=>{
    this.setState({
      dataSource:store.getState().ModelTrainingreducer.modelTrainingTable
    })
  }
  componentDidMount(){
    let returnData
    $.ajax({
      type:"post",
      url:hostPort+"equip/modal/selectPage",
      contentType:"application/json;charset=UTF-8",
      dataType:'JSON',
      async:false,
      data:JSON.stringify({
        "pageNo":1,
        "pageSize":10,
        /** 
        "queryParameter":
        {
          "sourceFile":Key[0],
        }
        */
      }),
      success:function(res){
        if(res.flag){
         console.log('13:53',res)
         returnData=res.data
        }
      },
      error:function(){
      }
    })
    if(returnData){
      const action ={
          type:'modelTrainingComponentDidMount',
          returnData
        }
      store.dispatch(action)
  }else{
    const action ={
      type:'modelTrainingComponentDidMount',
    }
    store.dispatch(action)
  }
    
  }

  onChange = (currentPage) => {
    /**用来判断表单中是否有值，如果没有值，就按照原先的方式执行 如果有值，那么就else了 */
    let returnData
    console.log('22:30',currentPage) 
        $.ajax({
          type:"post",
          url:hostPort+"equip/modal/selectPage",
          contentType:"application/json;charset=UTF-8",
          dataType:'JSON',
          async:false,
          data:JSON.stringify({
            "pageNo":currentPage,
            "pageSize":10,
          }),
          success:function(res){
            if(res.flag){
             console.log('13:53',res)
             returnData=res.data
            }
          },
          error:function(){
          }
        })
        if(returnData){
          const action ={
              type:'modelTrainingOnChange',
              returnData
            }
          store.dispatch(action)
      }else{
        const action ={
          type:'modelTrainingOnChange',
        }
        store.dispatch(action)
      }
}

  rowSelection = (selectedRowKeys, records) => {
    this.setState({
      rowkey: selectedRowKeys,
  });
    this.props.chooseRow(selectedRowKeys, records)
}
 
  render() {
    return (
        <div  style={{marginTop:20}}>
            <Table dataSource={this.state.dataSource}
                    rowSelection={{
                        mode: 'single',
                        onChange: this.rowSelection
                    }}
                >
                    <Table.Column title="模型" dataIndex="modelName" width={150} />
                    <Table.Column title="算法" dataIndex="algorithm" width={150} />
                    <Table.Column title="神经元个数" dataIndex="neuronsNumber" width={150} />
                    <Table.Column title="卷积层数" dataIndex="convolutionalLayers" width={150} />
                    <Table.Column title="池化层数" dataIndex="poolingLayers" width={150} />
                    <Table.Column title="学习率" dataIndex="learningRate" width={150} />
                    <Table.Column title="训练时间" dataIndex="trainingTime" width={150} />
                    
                </Table>
                <Pagination
                    onChange={this.onChange}
                    pageSize={(100 * 10) / store.getState().ModelTrainingreducer.totalCount}
                    current={this.state.pageNumber}
                    className="page-demo" />
        </div>
    );
  }
}
