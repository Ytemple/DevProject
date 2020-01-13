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
import PropTypes from 'prop-types';
import store from '../../../../Store/index'
import $ from 'jquery'
import {headerToken,hostPort} from '../../../../../Common'
import {BigNumber} from 'bignumber.js'; 
let i=10000;
export default class Table extends Component {
  static displayName = 'Table';
 
  static propTypes = {};

  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource:data
    };

    this.columns = [
      {
        title: '数据集名称',
        dataIndex: 'dataSetName',
        key: 'name',
      },
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          return (
            <span>
              <Preprocessing  handleSubmit={this.handleSubmit}/>
            </span>
          );
        },
      },
    ];
  }

/**提交模型训练 */
handleSubmit = (values) => {
  console.log('1.10 14:37',values)
  let returnData
  $.ajax({
    type:"POST",
    url:hostPort+"equip/modal/train",
    contentType:"application/json;charset=UTF-8",
    dataType:'JSON',
    async:false,
    data:JSON.stringify({
        sourceFile:''+store.getState().Preprocessingreducer.preProcessingID,
        name:'正在训练模型',
        method:2,
        neuronsNumber:'32',
        learningRate:"0.001",
      }),
    success:function(res){
      if(res.flag){
      returnData=res.data
      console.log('22:40',returnData)
      }
    },
    error:function(){
    }
  })
  if(returnData){
    const action ={
      type:'modelTrainingHandleSubmit',
      returnData
    }
    store.dispatch(action)
  }else{
    const action ={
      type:'modelTrainingHandleSubmit',
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
