import React, {Component} from 'react';
import StepForm from '../DataProcessing/StepForm'
import BoardList from './Drag/components/BoardList/index'
import { Button } from '@alifd/next';
//import store from './store/index'
import store from '../Store/index'

import { Link } from 'react-router-dom';

export default class DataProcessing extends Component {
    static displayName = 'DataProcessing'
    constructor(props){
        super(props);
        this.state={
            page:1,
            displayName: 'block',
          }
    }
    handleNext=()=>{
        this.setState({
            page:22,
            displayName: 'none',
          })
    }
/**保存要执行的模型 */
    handleSave=()=>{
      const action={
        type:'handleSave',
      }
      store.dispatch(action)
      //在这里返回新的state，然后把新的state中存的值来进行ajax连接
    }

    render(){
        let {page} =this.state
        function content() {
          if(page===1){
            return (
             <BoardList ></BoardList>
            )
          }else if(page===22){
            return(
              <StepForm ></StepForm>
            )
          }
      }
        return (
            <div >
            <div style={{ display: this.state.displayName }}>
                <Button  onClick={this.handleNext} >开始</Button>
                <Link  to='/List'>
                <Button  onClick={this.handleSave}>保存</Button>
                </Link>
            </div>
                <div>{content()}</div>
            </div>
        )
    } 
}