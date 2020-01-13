import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM} from '../store/actionType'
const dataStorage={
  modelTrainingTable:[{
    modelName:'模型1',
    algorithm:'模型1',
    neuronsNumber:'模型1',
    convolutionalLayers:'模型1',
    poolingLayers:'模型1',
    learningRate:'模型1',
    trainingTime:'模型1',
    id:1
  },{
    modelName:'模型2',
    id:2
  }
  ],
  key:'',//当前选中的树节点
  ModelTrainingID:'',//当前选中的处理文件的ID
}
//reducer可以接受state，但是不能修改state，所以必须要拷贝一份
const ModelTrainingreducer = (state=dataStorage,action)=>{
  //  Preprocessing\Preprocessing\Table2\TabTable\Table.jsx
  if(action.type==='modelTrainingHandleSubmit'){  //数据预处理后的结果
    const newState=JSON.parse(JSON.stringify(state));
    //目前先这样做，正常情况下是要返回回来已有的模型列表
    if(action.returnData){
      newState.modelTrainingTable[0].modelName=action.returnData.name
    }else{
      
    }
    return newState; 
   }

    return state;  //state存放的是所有的信息，整个store仓库里存储的数据 action指用户传过来的那句话
   
}
export default ModelTrainingreducer