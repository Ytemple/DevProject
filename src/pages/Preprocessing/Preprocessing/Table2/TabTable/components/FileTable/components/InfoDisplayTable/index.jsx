import React, { Component } from 'react';
import { Table } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './InfoDisplayTable.scss';
import $ from 'jquery'
import {headerToken,hostPort} from '../../../../../../../../../Common'
import store from '../../../../../../../../Store/index'
//import { Item } from '@alifd/next/types/breadcrumb';

/**
 * 表格接收的数据
 */
const column=[
  {
    title:'第1列',
    dataIndex:'第1列'
  },
  {
    title:'第2列',
    dataIndex:'第2列'
  },
  {
    title:'第3列',
    dataIndex:'第3列'
  },
  {
    title:'第4列',
    dataIndex:'第4列'
  }
]
const dataSource = () => {
  return [
    {
      第1列: 'cc',
      第2列: 'dd',
      第3列: 'ee',
      第4列: 'ff',
    },
  ];
};


export default class Index extends Component {
  static displayName = 'Index';
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    let getID=()=>{
      if(store.getState().Preprocessingreducer.preProcessingID){
        console.log('if ',store.getState())
        return store.getState().Preprocessingreducer.preProcessingID
      }else {
        console.log('else',store.getState())
        return store.getState().DataStoragereducer.fileID
      }
    }
    this.state = {
      column:column,
      dataSource:dataSource(),
      scrollToRow: 1,
      preProcessingID:getID()
    };
    console.log('23:04',this.state)
    //store.subscribe(this.handleStoreChange);
  }
  /** 不需要handleStoreChange */
  /**
  handleStoreChange=()=>{
    let getID=()=>{
      if(store.getState().Preprocessingreducer.preProcessingID){
        console.log('if ',store.getState())
        return store.getState().Preprocessingreducer.preProcessingID
      }else {
        console.log('else',store.getState())
        return store.getState().DataStoragereducer.fileID
      }
    }
    this.setState({
      preProcessingID:getID()
    })
  console.log('22:10 sequence changed', this.state.preProcessingID)
  }
   */
  componentDidMount(){
    let tableColumnLength
    let tableData
    console.log('17:14',this.props.id)
    console.log('22:50',store.getState().DataStoragereducer.fileID)
    $.ajax({
      type:"get",
      url:hostPort+"equip/sequence/read/1214439952377974786",
      dataType:'JSON',
      contentType:"application/json;charset=UTF-8",
      async:false,
      success:function(res){
        if(res.flag){
          console.log('1.6 15:19',res)
          console.log('15:21',res.data[0])
          tableColumnLength=Object.keys(res.data[0]).length
          tableData=res.data.slice(1)
          console.log('15:21',tableData)
          console.log('15:27',Object.keys(res.data[0]).length)
        }
      },
      error:function(){
      }
    })
   let getCol = () => {
     let col =[]
     for(let i=1;i<=tableColumnLength;i++){
       let colContent={
        title:'第'+i+'列',
        dataIndex:'第'+i+'列',
       }
      col.push(colContent)
     }
     return col
    };
    getCol()
    this.setState({
      column:getCol(),
      dataSource:tableData
    })
    /** 
    const action ={
      type:'sequenceFileID',
      id: record.id
    }
    store.dispatch(action)
    */
}

  getColumn=()=>{
    return (
      this.state.column.map((item,index)=>{
        return (
        <Table.Column title={item.title} dataIndex={item.title}  resizable={true} width={150}/>
        )
      })
    )
  }
  onBodyScroll = (start) => {
    this.setState({
        scrollToRow: start
    });
}

  render() {
    return (
      <div className="info-display-table"  >
        <IceContainer 
       // style={{ width: 1000, overflow:'scroll'}}
        >
          <Table 
          dataSource={this.state.dataSource}  
          maxBodyHeight={600} 
          scrollToRow={this.state.scrollToRow} 
          onBodyScroll={this.onBodyScroll}
          useVirtual
          >
         {this.getColumn()}  
          </Table>
        </IceContainer>
      </div>
    );
  }
}


