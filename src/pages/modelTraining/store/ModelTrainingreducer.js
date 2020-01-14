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
  totalCount:'',
  key:'',//当前选中的树节点
  ModelTrainingID:'',//当前选中的处理文件的ID
}
//reducer可以接受state，但是不能修改state，所以必须要拷贝一份
const ModelTrainingreducer = (state=dataStorage,action)=>{
  //  Preprocessing\Preprocessing\Table2\TabTable\Table.jsx
  if(action.type==='modelTrainingHandleSubmit'){  //数据预处理后的结果
    const newState=JSON.parse(JSON.stringify(state));
    let newTable=[]
    if(action.returnDataList.pageList){
      action.returnDataList.pageList.map((item,index)=>{
        item.modelName=item.name,
        item.algorithm=item.method
        newTable.push(item)
      })
    }else{
    }
    newState.modelTrainingTable=newTable
    newState.totalCount=action.returnDataList.totalCount
    return newState; 
   }
//C:ModelTraining\VibrationData\TableVibrationModelTraining\Table\Table.jsx  
   if(action.type==='modelTrainingComponentDidMount'){  //初始化加载
    const newState=JSON.parse(JSON.stringify(state));
    let newTable=[]
    if(action.returnData.pageList){
      action.returnData.pageList.map((item,index)=>{
        item.modelName=item.name,
        item.algorithm=item.method
        newTable.push(item)
      })
    }else{
    }
    newState.modelTrainingTable=newTable
    newState.totalCount=action.returnData.totalCount
    return newState; 
   }
   //\ModelTraining\VibrationData\TableVibrationModelTraining\Table\Table.jsx
   if(action.type==='modelTrainingDelete'){    //删除已有模型列表。
    const newState=JSON.parse(JSON.stringify(state));
    let newTable=[]
    if(action.returnList.pageList){
      action.returnList.pageList.map((item,index)=>{
        item.modelName=item.name,
        item.algorithm=item.method
        newTable.push(item)
      })
    }else{
    }
    newState.modelTrainingTable=newTable
    newState.totalCount=action.returnList.totalCount
    return newState; 
   }

   if(action.type==='modelTrainingOnChange'){    //删除已有模型列表。
    const newState=JSON.parse(JSON.stringify(state));
    let newTable=[]
    if(action.returnData){
      action.returnData.pageList.map((item,index)=>{
        item.modelName=item.name,
        item.algorithm=item.method
        newTable.push(item)
      })
    }else{
    }
    newState.modelTrainingTable=newTable
    newState.totalCount=action.returnData.totalCount
    return newState; 
   }

    return state;  //state存放的是所有的信息，整个store仓库里存储的数据 action指用户传过来的那句话 
}
export default ModelTrainingreducer