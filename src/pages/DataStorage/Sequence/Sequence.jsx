import React, { Component, PureComponent } from 'react';
//import ContentMenu from '../tree1/treeIndex/index'

//import TabTable from '../tree1/treeTable/index'
import $ from 'jquery'
import TreeIndex from './TreeIndex/index';
import dataConfig from './TreeIndex/dataConfig'
import Table1 from './Table1/index'
import Table2 from './Table2/index'
import store from '../../Store/index'
import {headerToken,hostPort} from '../../../Common'
let data1 = [];
let n1 = 1111;
let i = 100000000

const defaultValue = [   //在这里定义文件列表中要显示的数据
];


export default class Sequence extends Component {

  static displayName = 'Sequence';
  static contextTypes = {
  }
  constructor(props) {
    super(props);
    /**在这儿设置一下state，获取值，然后再通过this.state来调用这个值 */
    this.state = {
      displayName: 'none',
      childrenData: data1,  //table1中的数据
      dataConfig: store.getState().DataStoragereducer.SequenceDataConfig,
      treeKey: '',  //当前选中的树节点
      number: n1,  //给number写一个异步的
      FileValue: defaultValue,
    };
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange=()=>{
    this.setState({
      dataConfig: store.getState().DataStoragereducer.SequenceDataConfig,
    })
    console.log('sequence changed', store.getState().DataStoragereducer.SequenceDataConfig)
  }

  componentDidMount(){
    let dataConfig10
    $.ajax({
      type:"get",
      url:hostPort+"equip/menu/buildMenu",
      contentType:"application/json;charset=UTF-8",
      dataType:'JSON',
      async:false,
      success:function(res){
        if(res.flag){
         dataConfig10=res.data[1]
         console.log('11:58',res.data[1])
        }
      },
      error:function(){
      }
    })
    if(dataConfig10){
        let dataConfig2=JSON.parse(JSON.stringify(dataConfig10).replace(/"menuName"/g,' "label"'))  ;
        let dataConfig3=JSON.parse(JSON.stringify(dataConfig2).replace(/"id"/g,' "key"'))  ;
        let dataConfig1=JSON.parse(JSON.stringify(dataConfig3).replace(/"child"/g,' "children"'))   ;
        const action ={
          type:'SequenceComponenDidMount',
          dataConfig:dataConfig1
        }
        store.dispatch(action)
    }
}

  /**通过单击，来设置display，决定是否展现组件 */

  onSelectBlock = (url) => {
    data1.splice(0,data1.length);
    this.setState({
      displayName: 'block',
      key: url,
    })
  }

  /**用来重置树节点的children节点中的信息 table1 */
  getChildrenData = (key, shuju) => {
    shuju.map((item, i) => {
      if (key == item.key) {
        if (item.children) {
          for (i = 0; i < item.children.length; i++) {
            data1.push(
              {
                childNode: item.children[i].label,
                treeTableKey: item.children[i].key,
                componentNo: item.children[i].engineerId,
                componentCode: item.children[i].componentNo,
                sum: item.children[i].createTime,
                createPerson: item.children[i].updateTime,
              },
            )
            this.setState({
              childrenData: data1,
            });
          }
        }
      }
      if (item.children) {
        this.getChildrenData(key, item.children);
      } else {
      }
    })
  }

  /**改变树节点 */
  changeTreeData = (dataIndex, values) => {
    const { childrenData } = this.state;
    childrenData[dataIndex] = values;  //将修改后的表单数据响应的赋值进去。
    this.readData(this.state.dataConfig, childrenData, dataIndex);
  }

  readData = (data, childrenData, dataIndex) => {
    data.map((item, i) => {
      if (item.key == childrenData[dataIndex].childNode) {
        item.label = childrenData[dataIndex].componentCode
        this.setState({
          dataConfig: data,
        });
      }
      if (item.children) {
        this.readData(item.children, childrenData, dataIndex);
      }
    })
  }
  /** 获取树节点     同时获取文件列表中的值*/
  getTreekey = (Key) => {
    const valueList = [
    ];
  
  let table={
  }
  let tableList = []
  $.ajax({
    type:"POST",
    url:hostPort+"equip/file/selectPage",
    contentType:"application/json;charset=UTF-8",
    dataType:'JSON',
    async:false,
    data:JSON.stringify({
      "pageNo":1,
      "pageSize":10,
      "queryParameter":
      {
        "dataId":Key[0],
      }
    }),
    success:function(res){
      if(res.flag){
        res.data.pageList.map((item,index)=>{
          tableList.push({
            id:item.id,
            name:item.fileName,
            downloadURL:hostPort+'equip/file/download/'+item.id
        })
       })
      }
    },
    error:function(){
    }
  })
  if(tableList){
    const action ={
        type:'getSequenceTreekey',
        key:Key[0],
        tableList
      }
    store.dispatch(action)
}




    this.setState({
      treeKey: Key[0],
      FileValue: valueList
    })
  }
  /** 编辑树节点 */

  changeChild = (name, code, key) => {
    const { dataConfig } = this.state
    this.dataCircleChange(this.state.dataConfig, name, code, key)
    console.log('15:13',name, code, key)
  }

  dataCircleChange = (data, name, code, key) => {
   
    data.map((item, index) => {
      if (item.children) {
        this.dataCircleChange(item.children, name, code, key)
      }
      if (item.key == key) {
        item.label = name
        let dataConfig10
        $.ajax({
          type:"POST",
          url:hostPort+"equip/menu/saveOrUpdate",
          contentType:"application/json;charset=UTF-8",
          dataType:'JSON',
          async:false,
          data:JSON.stringify({
              id:item.key,
              "menuName":item.label,
              "dataType":"2"
            }),
          success:function(res){
            
            if(res.flag){
            dataConfig10=res.data[1]
            }
          },
          error:function(){
          }
        })
        if(dataConfig10){
            let dataConfig2=JSON.parse(JSON.stringify(dataConfig10).replace(/"menuName"/g,' "label"'))  ;
            let dataConfig3=JSON.parse(JSON.stringify(dataConfig2).replace(/"id"/g,' "key"'))  ;
            let dataConfig1=JSON.parse(JSON.stringify(dataConfig3).replace(/"child"/g,' "children"'))   ;
          
            const action ={
              type:'SequenceaddChild',
              dataConfig:dataConfig1
            }
            store.dispatch(action)
        }else{
          const action ={
            type:'SequenceaddChild',
            dataConfig:data
          }
          store.dispatch(action)
          item.children.push(addData)
          this.setState({
            dataConfig: this.state.dataConfig
          })
        }
        this.setState({
          dataConfig: this.state.dataConfig,
        })
      }
    })
    const action ={
      type:'SequencechangeChild',
      dataConfig:data
    }
    store.dispatch(action)
  }
  /**新增树节点 */
  
  addChild = (newData) => {
    i++
    let xinzeng = {
      label:  '新增',
    }
    this.getData(this.state.dataConfig, xinzeng)
  }
  getData = (data, addData) => {
    data.map((item, index) => {
      
      if (item.children) {
        this.getData(item.children, addData)
      }
      if (item.key == this.state.treeKey) {  //树节点遍历的节点如果和当前选中的节点相同，那么就在当前选中的节点下，新增一个子节点
       console.log('10:36',item.key)
      let dataConfig10
      $.ajax({
        type:"POST",
        url:hostPort+"equip/menu/saveOrUpdate",
        contentType:"application/json;charset=UTF-8",
        dataType:'JSON',
        async:false,
        data:JSON.stringify({
            "pId":item.key,
            "menuName":"新增",
            "dataType":"2"
          }),
        success:function(res){
          
          if(res.flag){
          dataConfig10=res.data[1]
          }
        },
        error:function(){
        }
      })
      if(dataConfig10){
          let dataConfig2=JSON.parse(JSON.stringify(dataConfig10).replace(/"menuName"/g,' "label"'))  ;
          let dataConfig3=JSON.parse(JSON.stringify(dataConfig2).replace(/"id"/g,' "key"'))  ;
          let dataConfig1=JSON.parse(JSON.stringify(dataConfig3).replace(/"child"/g,' "children"'))   ;
        
          const action ={
            type:'SequenceaddChild',
            dataConfig:dataConfig1
          }
          store.dispatch(action)
      }else{
        const action ={
          type:'SequenceaddChild',
          dataConfig:data
        }
        store.dispatch(action)
        item.children.push(addData)
        this.setState({
          dataConfig: this.state.dataConfig
        })
      }
      }
    })
  }
 

  /**删除树节点 */
  deleteChild = (value, tIndex) => {
    this.dataCircleDelete(this.state.dataConfig, value.treeTableKey, this.state.treeKey, tIndex)
  }
  dataCircleDelete = (data, key, fatherKey, tIndex) => {
    data.map((item, index) => {
      if (item.children) {
        this.dataCircleDelete(item.children, key, fatherKey, tIndex)
      }
      if (item.key == fatherKey) {
        let dataConfig10

        $.ajax({
          type:"DELETE",
          url:hostPort+"equip/menu/delete/"+key,
          contentType:"application/json;charset=UTF-8",
          dataType:'JSON',
          async:false,
          success:function(res){
            
            if(res.flag){
              console.log('20:41',res)
           
            }
          },
          error:function(){
          }
        })
       
        if(dataConfig10){
          item.children.splice(tIndex, 1)
          const action ={
            type:'SequencedeleteChild',
            dataConfig:data
          }
          store.dispatch(action)
          this.setState({
            dataConfig: this.state.dataConfig
          })
        }else{
          item.children.splice(tIndex, 1)
          const action ={
            type:'SequencedeleteChild',
            dataConfig:data
          }
          store.dispatch(action)
          this.setState({
            dataConfig: this.state.dataConfig
          })
        }
      }
     
    })
  }
 

  render() {
    return (
      <div className="home-page" style={styles.homePage}>
        <TreeIndex
          dataConfig={this.state.dataConfig}
          onSelectBlock={this.onSelectBlock}
          getChildrenData={this.getChildrenData}
          getTreekey={this.getTreekey}  //一个是获取树节点，还有就是通过获取的这个树节点去获取文档列表
        ></TreeIndex>
       
        <div style={{ display: this.state.displayName }}>
          <Table1
            childrenData={this.state.childrenData}

            changeTreeData={this.changeTreeData}
            changeChild={this.changeChild}
            addChild={this.addChild}
            deleteChild={this.deleteChild}
          ></Table1>
          <Table2 pid={this.state.treeKey}> 
            
          </Table2>
        </div>
      </div>
    );
  }
}

const styles = {
  homePage: {   //在这儿就设置了弹性，所以才有了后来项目的弹性
    display: 'flex',
    flexDirection: 'row',
    //height: '100vh',
  },
  mainContent: {   //这个我没有找到，这个是用来设置弹性项目的
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'auto',
  },
  table: {
    display: 'block',
  }
};

