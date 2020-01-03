import React, { Component } from 'react';
import { Table } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './InfoDisplayTable.scss';
import $ from 'jquery'
import {headerToken,hostPort} from '../../../../../../../../../Common'
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
    this.state = {
      column:column,
      dataSource:dataSource()
    };
  }
  
  componentDidMount(){
    let tableColumn
    let tableData
    console.log('17:14',this.props.id)
    $.ajax({
      type:"get",
      url:hostPort+"equip/sequence/read/"+this.props.id,
      dataType:'JSON',
      contentType:"application/json;charset=UTF-8",
      async:false,
      success:function(res){
        if(res.flag){
          tableColumn=res.data[0]
         
          tableData=res.data.slice(1)
          console.log('12,14.11:22',tableColumn,tableData)
        }
      },
      error:function(){
      }
    })
    this.setState({
     // column:tableColumn,
      dataSource:tableData
    })
}


  getColumn=()=>{
    return (
      this.state.column.map((item,index)=>{
        return (
        <Table.Column title={item.title} dataIndex={item.title}/>
        )
      })
    )
      
  }
   
  render() {
    return (
      <div className="info-display-table">
        <IceContainer>
          <Table dataSource={this.state.dataSource}>
         {this.getColumn()}  

          </Table>
        </IceContainer>
      </div>
    );
  }
}


