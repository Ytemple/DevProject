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
    let tableColumnLength
    let tableData
    $.ajax({
      type:"get",
      url:hostPort+"equip/sequence/read/"+this.props.id,
      dataType:'JSON',
      contentType:"application/json;charset=UTF-8",
      async:false,
      success:function(res){
        if(res.flag){
          tableColumnLength=Object.keys(res.data[0]).length
          tableData=res.data.slice(1)
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
   
  onBodyScroll = (start) => {
    this.setState({
        scrollToRow: start
    });
}

  render() {
    return (
      <div className="info-display-table">
        <IceContainer>
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


