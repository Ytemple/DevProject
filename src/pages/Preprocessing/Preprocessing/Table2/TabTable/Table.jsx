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
let i=10000;
export default class Table extends Component {
  static displayName = 'Table';
 
  static propTypes = {};

  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource:store.getState().Preprocessingreducer.preProcessingTable,
      preProcessingID:store.getState().Preprocessingreducer.preProcessingID    //预处理后的文件预处理id

    };
    store.subscribe(this.handleStoreChange);
    this.columns = [
      {
        title: '预处理算法',
        dataIndex: 'algorithm',
        key: 'algorithm',
      },
      {
        title: '采样通道',
        dataIndex: 'aisle',
        key: 'aisle',
      },
      {
        title: '采样次数',
        dataIndex: 'sampleNumber',
        key: 'sampleNumber',
      },
      {
        title: '处理人',
        dataIndex: 'createPerson',
        key: 'createPerson',
      },
      {
        title: '处理日期',
        dataIndex: 'createDate',
        key: 'createDate',
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
              <Preprocessing handleSubmit={this.handleSubmit}/>
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }
  handleStoreChange=()=>{
    this.setState({
      dataSource:store.getState().Preprocessingreducer.preProcessingTable,
    })
   console.log('preprocessing changed', store.getState().Preprocessingreducer)
  }

 
/**提交数据预处理 */
handleSubmit = (values) => {
  let returnData
  $.ajax({
    type:"POST",
    url:hostPort+"equip/dig/preProcess",
    contentType:"application/json;charset=UTF-8",
    dataType:'JSON',
    async:false,
    data:JSON.stringify({
        "id":2,
        /** 
        "resultFileId":this.state.preProcessingID,
        algorithm: values.algorithm,
        "aisle":values.aisle,
        sampleNumber:values.sampleNumber,
        createPerson:values.createPerson,
        createDate:values.createDate,
        */
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
      type:'handleSubmit',
      returnData
    }
    store.dispatch(action)
  }else{
    const action ={
      type:'handleSubmit',
    }
    store.dispatch(action)
  }
  
};

/**编辑 */
  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;  //将修改后的表单数据响应的赋值进去。
    this.setState({
      dataSource,
    });
  this.props.changeChild(values.childNode,values.componentCode,this.props.childrenData[dataIndex].treeTableKey); 
  };
/**删除 */
  handleRemove = (value, index) => {
    //this.props.deleteChild(this.state.dataSource[index],index);
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    this.setState({
      dataSource,
    });
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
