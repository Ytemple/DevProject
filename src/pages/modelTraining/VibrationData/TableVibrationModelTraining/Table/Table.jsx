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
import {headerToken,hostPort} from '../../../../../Common'
import $ from 'jquery'
let i=10000;
export default class TableVibrationModelTraining extends Component {
  static displayName = 'TableVibrationModelTraining';
 
  static propTypes = {};

  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource:store.getState().ModelTrainingreducer.modelTrainingTable
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
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              {/** 
              <Preprocessing />
            */}
            <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
    store.subscribe(this.handleStoreChange);
  }

  handleStoreChange=()=>{
    this.setState({
      dataSource:store.getState().ModelTrainingreducer.modelTrainingTable
    })
   //console.log('preprocessing changed', store.getState().Preprocessingreducer)
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

/**删除 */
  handleRemove = (value, index, record) => {
    //console.log('2020.1.14 14:17',record,index)
    let flag
    $.ajax({
      type:"delete",
      url:hostPort+"equip/modal/delete/"+record.id,
      contentType:"application/json;charset=UTF-8",
      dataType:'JSON',
      async:false,
      success:function(res){
        if(res.flag){
         flag=res.flag
        }
      },
      error:function(){
      }
    })
    if(flag){
      let returnList
      $.ajax({
        type:"post",
        url:hostPort+"equip/modal/selectPage",
        contentType:"application/json;charset=UTF-8",
        dataType:'JSON',
        async:false,
        data:JSON.stringify({
          "pageNo":0,
          "pageSize":10,
        }),
        success:function(res){
          if(res.flag){
         // console.log('13:53',res)
          returnList=res.data.pageList
          }
        },
        error:function(){
        }
      })
      const action ={
        type:'modelTrainingDelete',
        returnList
      }
      store.dispatch(action)
      }else{
        const { dataSource } = this.state;
        dataSource.splice(index, 1);
        this.setState({
          dataSource,
        });
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
