import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import { Grid, Step, Button,Icon } from '@alifd/next';
import BoardList from './Drag/components/BoardList/index'
import TableInfo from './Process/Preprocessing/Table/index'
import FeatureExtraction from './Process/FeatureExtraction/index'
import FeatureScreening from './Process/FeatureScreening/index'
import TimeFrequency from './Process/TimeFrequency/index'
import TagManagement from './Process//TagManagement/index'
import DataSetConstruction from './Process/DataSetConstruction/index'
import ModelTraining from './Process/ModelTraining/index'
import ModelCheck from './Process/ModelCheck/index'

//import store from '../../pages/DataProcessing/store/index'
import store from '../Store/index'

import styles from './index.module.scss';

const { Row, Col } = Grid;
let i=1
export default class StepForm extends Component {
  static displayName = 'StepForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = store.getState().DataProcessingreducer.step
    store.subscribe(this.handleStoreChange) ;
  }
  handleStoreChange=()=>{
    this.setState(store.getState().DataProcessingreducer.step);
  }

  nextStep = () => {
    const action={
      type:'nextStep',
    }
    store.dispatch(action)
  };


  prevStep=()=>{
    const action={
      type:'prevStep',
    }
    store.dispatch(action)
  }

  compare=(id)=>{
    if(id==='数据预处理'){
      return <TableInfo onSubmit={this.nextStep} style={yangshi.table} / >;
    }else if(id==='特征提取'){
      return <FeatureExtraction onSubmit={this.nextStep} />;
    }else if(id==='特征筛选'){
      return <FeatureScreening onSubmit={this.nextStep} />;
    }else if(id==='时频图像转换'){
      return <TimeFrequency onSubmit={this.nextStep} />;
    }else if(id==='标签管理'){
      return <TagManagement onSubmit={this.nextStep} />;
    }else if(id===6){
      return <DataSetConstruction onSubmit={this.nextStep} />;
    }else if(id===7){
      return <ModelTraining onSubmit={this.nextStep} />;
    }else if(id===8){
      return <ModelCheck onSubmit={this.nextStep} />;
    }
    else{
      return (
        <div className={styles.content}>
          <h2>
            <Icon type="success" className={styles.icon} size="xl" />
            执行完毕
          </h2>
        </div>
      );
    }
  }

  renderStep = (step) => {
    let flag=store.getState().DataProcessingreducer.cardData.lanes[1].cards
    return flag.map((item,index)=>{
      if(step===item.sequence){
       return this.compare(item.title)
      }
    })
  };

  render() {
  function content() {
    let dragData=store.getState().DataProcessingreducer.cardData.lanes[1].cards
    return dragData.map((item)=>{
      return (
        <Step.Item title={item.title} 
        />
      )
    })
  }
    return (
      <div className="step-form">
        <IceContainer>
          <Row wrap>
            <Col xxs="24" s="2" l="2" className={styles.formLabel}>
              <Step
                current={this.state.step}
                direction="ver"
                shape="dot"
                animation={false}
                className={styles.step}
              >
              {content()}
              </Step>
              <Button onClick={this.prevStep} type="primary" >
                上一步
              </Button>
              <Button onClick={this.nextStep} type="primary" >
                下一步
              </Button>
            </Col>
            <Col xxs="24" s="18" l="18">
              {this.renderStep(this.state.step)}
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const yangshi={
  table: {
    marginLeft: '1000px',
  }
}