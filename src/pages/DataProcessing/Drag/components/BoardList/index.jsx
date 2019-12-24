import React, { Component } from 'react';
import Board from 'react-trello';
import styles from './index.module.scss';
import { Button } from '@alifd/next';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import {headerToken,hostPort} from '../../../../../Common'
import store from '../../../../Store/index'

export default class BoardList extends Component {
  static displayName = 'BoardList';

  constructor(props){
    super(props);
    this.state={
      card:store.getState().DataProcessingreducer
    }
    store.subscribe(this.handleStoreChange) ;
  }
  handleStoreChange=()=>{
    this.setState({
      card:store.getState().DataProcessingreducer,
    })
  }

  handleDragStart = (cardId, laneId) => {
  //  console.log('handleDragStart:', cardId, laneId);
  };

  handleDragEnd=(cardId, sourceLaneId, targetLaneId, position, cardDetails)=>{
  //  console.log('17:11',cardDetails)
  }

  shouldReceiveNewData = (nextData) => {
    console.log('17:27',nextData.lanes[1],store.getState().DataProcessingreducer.step.cardIndex)
    let rdata
  /** 
    getdata=()=>{
      return (
        nextData.lanes[1].cards.map((item,index)=>{
         delete item.id
         conso
        })
      )
    }
   
    $.ajax({
      type:"POST",
      url:hostPort+"equip/process/saveOrUpdate",
      contentType:"application/json;charset=UTF-8",
      dataType:'JSON',
      async:false,
      data:JSON.stringify({
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
   */   
    const action={
      type:'shouldReceiveNewData',
      nextData
    }
    store.dispatch(action)
  };

  handleCardAdd = (card, laneId) => {
   // console.log(`New card added to lane ${laneId}`);
  };

  handleNext=()=>{

  }


  render() {
    
    return (
      <div className={styles.boardList}>
        <Board
          data={this.state.card.cardData}
          draggable
          collapsibleLanes
          
          handleDragStart={this.handleDragStart}
          handleDragEnd= {this.handleDragEnd}
          onDataChange={this.shouldReceiveNewData}
          onCardAdd={this.handleCardAdd}
         // editable
        />
     
      </div>

    );
  }
}