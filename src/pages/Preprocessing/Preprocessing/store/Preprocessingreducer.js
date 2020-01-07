import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM} from '../store/actionType'
const dataStorage={
  preProcessingTable:[
    {
      algorithm:'数据预处理zzz',
      aisle:'数据预处理zzz',
      sampleNumber:'数据预处理zzz',
      createPerson:'数据预处理zzz',
      createDate:'createDate',
    }
  ],
  key:'',//当前选中的树节点
  preProcessingID:'',//当前选中的处理文件的ID
}
//reducer可以接受state，但是不能修改state，所以必须要拷贝一份
const Preprocessingreducer = (state=dataStorage,action)=>{
  //  Preprocessing\Preprocessing\Table2\TabTable\Table.jsx
  if(action.type==='handleSubmit'){  //数据预处理后的结果
    const newState=JSON.parse(JSON.stringify(state));
    console.log('1.3 20:19',newState)
    newState.preProcessingTable=[action.returnData]
    newState.preProcessingID=action.returnData.resultFileId
    return newState;
   }

    return state;  //state存放的是所有的信息，整个store仓库里存储的数据 action指用户传过来的那句话
   
}
export default Preprocessingreducer