import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import styles from './index.module.scss';
import {  Button,Search } from '@alifd/next';
import { Link } from 'react-router-dom';
import store from '../../../Store/index'
import NewDialog from '../NewDialog'

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
  executeModel=(index)=>{
    const action={
      type:'executeModel',
      index
    }
    store.dispatch(action)
  }
  NewModel=(values)=>{
    let i=100
    const newList={
      id:i++,
      title:values,
      cards: [
      ],
    }
    const action={
      type:'NewModel',
      newList
    }
    store.dispatch(action)
  }

  onSearch=(v)=> {
    console.log(v);
  }

  deleteModel=(index)=>{
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
                 <Button className={styles.lightBlue } onClick={this.executeModel.bind(this,index)} index={index}>
                    调用示例
                  </Button>
                  </Link>
                  <a className={styles.green }>在线预测</a>
                  <Button className={styles.lightBlue } onClick={this.deleteModel.bind(this,index)} index={index}>
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

