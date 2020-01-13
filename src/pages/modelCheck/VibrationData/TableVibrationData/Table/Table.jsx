import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import data from './data';
import {Button} from '@alifd/next';
import { Link } from 'react-router-dom';
import Preprocessing from './components/Preprocessing';
import $ from 'jquery'
import {headerToken,hostPort} from '../../../../../Common'
import store from '../../../../Store/index'
import PropTypes from 'prop-types';

let i=10000;
export default class Table extends Component {
  static displayName = 'Table';
 
  static propTypes = {};

  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource:store.getState().ModelCheckreducer.modelCheckTable,
    };
    this.columns = [
      {
        title: '数据集名称',
        dataIndex: 'dataSetName',
        key: 'dataSetName',
      },
      {
        title: '算法',
        dataIndex: 'algorithm',
        key: 'algorithm',
      },
      {
        title: '模型',
        dataIndex: 'model',
        key: 'model',
      },
      {
        title: '校验精度值',
        dataIndex: 'accuracy',
        key: 'accuracy',
      },
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          return (
            <span>
              <Preprocessing handleSubmit={this.handleSubmit}/>
            </span>
          );
        },
      },
    ];
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange=()=>{
    this.setState({
      dataSource:store.getState().ModelCheckreducer.modelCheckTable,
    })
  }
  handleSubmit = (values) => {
    let returnData
    var fd = new FormData();
    fd.append("algorithmId",3);
    fd.append("modalId",9);
    $.ajax({
      type:"POST",
      url:hostPort+"equip/modal/test",
      contentType: false,
      processData: false,
      dataType:'JSON',
      async:false,
      data: fd,
      success:function(res){
        if(res.flag){
        returnData=res.data
        console.log('1.13 21:44',returnData)
        }
      },
      error:function(){
      }
    }) 
    if(returnData){
      const action ={
        type:'modelCheckHandleSubmit',
        returnData
      }
      store.dispatch(action)
    }else{
      returnData=values
      const action ={
        type:'modelCheckHandleSubmit',
      }
      store.dispatch(action)
    }
  };

  render() {
    const { dataSource } = this.state;
    return (
        <div>
            
        <IceContainer>          
                  <CustomTable
                    dataSource={dataSource}
                    columns={this.columns}
                    hasBorder={false}
                  />               
        </IceContainer>
        </div>
    );
  }
}
