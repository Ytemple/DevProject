import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM} from '../store/actionType'
const dataStorage={
  modelCheckTable:[
    {
      dataSetName:'模型测试',
      algorithm:'模型测试',
      model:'模型测试',
      //accuracy:'模型测试',
    }
  ],
  key:'',//当前选中的树节点
  preProcessingID:'',//当前选中的处理文件的ID
}
//reducer可以接受state，但是不能修改state，所以必须要拷贝一份
const ModelCheckreducer = (state=dataStorage,action)=>{
  //  Preprocessing\Preprocessing\Table2\TabTable\Table.jsx
  if(action.type==='modelCheckHandleSubmit'){  //数据预处理后的结果
    const newState=JSON.parse(JSON.stringify(state));
    newState.modelCheckTable[0].accuracy=action.returnData
    console.log('2020.1.13 22:39',action,newState)
    return newState;
   }
    return state;  //state存放的是所有的信息，整个store仓库里存储的数据 action指用户传过来的那句话
   
}
export default ModelCheckreducer