import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import styles from './index.module.scss';
import {  Button,Search } from '@alifd/next';
import { Link } from 'react-router-dom';
import store from '../../../Store/index'
import NewDialog from '../NewDialog'
import $ from 'jquery'
import {headerToken,hostPort} from '../../../../Common'
const { Row, Col } = Grid;
const dataSet = [{
  title:'模型',
  cards: [
    {
      value:123,
    }
  ],
},

{
  title:'模型',
  cards: [
  ],
}]

export default class ModelCards extends Component {
  static displayName = 'ModelCards';
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    const cardList= store.getState().DataProcessingreducer.list
    console.log('17:23',store.getState())
    this.state = {
      list:cardList
    }
    store.subscribe(this.handleStoreChange) ;
  }
  handleStoreChange=()=>{
    this.setState({
      list:store.getState().DataProcessingreducer.list
    });
    console.log('handleStoreChange',this.state)
  }
  
  componentDidMount(){
    let rdata
    $.ajax({
      type:"get",
      url:hostPort+"equip/process/findAll",
      dataType:'JSON',
      async:false,
      success:function(res){
        if(res.flag){
         console.log('12,13 16:02',res.data)
         rdata=res.data
        }
      },
      error:function(){
      }
    })
    if(rdata){
      const action={
        type:'componentDidMountModel',
        list:rdata
      }
      store.dispatch(action)
    }else{
      const action={
        type:'componentDidMountModel',
      }
      store.dispatch(action)
    }
    
  }

  /**执行模型 */
  executeModel=(index)=>{
    const action={
      type:'executeModel',
      index
    }
    store.dispatch(action)
  }
  /** 新建模型 */
  NewModel=(values)=>{
    let rdata
    $.ajax({
      type:"POST",
      url:hostPort+"equip/process/saveOrUpdate",
      contentType:"application/json;charset=UTF-8",
      dataType:'JSON',
      async:false,
      data:JSON.stringify({
       // "id": 1,
        "name": values,
        "algorithm": "111",
        "creator": "111",
        "cards": [
        ],
        "title": values,
        "description": values,
        }),
      success:function(res){
        if(res.flag){
         rdata=res.data
        }
      },
      error:function(){
      }
    })
    let i=100
    const newList={
      id:i++,
      title:values,
      cards: [
      ],
    }
    if(rdata){
      const action={
        type:'NewModel',
        newList:rdata
      }
      store.dispatch(action)
    }else{
      const action={
        type:'NewModel',
        newList:newList
      }
      store.dispatch(action)
    }
  }

  onSearch=(v)=> {
    console.log(v);
  }
/** 删除模型 */
  deleteModel=(index)=>{
    let rdata
    $.ajax({
      type:"Delete",
      url:hostPort+"equip/process/delete/"+index,
      contentType:"application/json;charset=UTF-8",
      dataType:'JSON',
      async:false,
      success:function(res){
        if(res.flag){
        console.log('16:34',res)
        }
      },
      error:function(){
      }
    })
    const action={
      type:'deleteModel',
      index
    }
    store.dispatch(action)
    console.log('delete',index)
  }

  render() {
    const mockData = this.state.list
    return (
      <div>
      <Search key="2" shape="simple" onSearch={this.onSearch} style={{width: '150px'}}/>,
      <p></p>
      <NewDialog  NewModel={this.NewModel}/>
      <Row wrap gutter="40" className={styles.row}>
        {mockData.map((data, index) => {
          return (
            <Col l="6" key={index}>
              <div className={styles.modelCards}>
                <div className={styles.head}>
                  <Icon type="electronics" className={styles.icon} /> {data.title}  {/** data.title  */}
                </div>
                <div className={styles.cards}>
                  {data.cards.map((item, key) => {
                    return (
                      <div className={styles.item} key={key}>
                      {/** <span className={styles.label}>{item.label}：</span>  */} 
                      <span className={styles.title}>{item.title}</span>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.footer}>
                  <Link to="/DataProcessing" >
                 <Button className={styles.lightBlue } onClick={this.executeModel.bind(this,data.id)} index={data.id}>
                    调用示例
                  </Button>
                  </Link>
                  <a className={styles.green }>在线预测</a>
                  <Button className={styles.lightBlue } onClick={this.deleteModel.bind(this,data.id)} index={data.id}>
                    删除
                  </Button>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      </div>
    );
  }
}

