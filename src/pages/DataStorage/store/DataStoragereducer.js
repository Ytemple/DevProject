import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM} from '../store/actionType'



const dataStorage={
  VibrationDataConfig:[
    {
      label: '振动',
      key: '/tree12',
      path:'12',
      children: [
        {
          label: '振动12',
          key: '/tree1.12',
          path:'12',
        },
      ],
    },
  ],
  SequenceDataConfig:[
    {
      label: '时序',
      key: '/tree13',
      path:'13',
      children: [
        {
          label: '时序13',
          key: '/tree1.13',
          path:'13',
        },
      ],
    },
  ],
  ImageDataConfig:[
    {
      label: '图像',
      key: '/tree11',
      path:'11',
      children: [
        {
          label: '图像11',
          key: '/tree1.11',
          path:'11',
        },
      ],
    },
  ],
  sequenceFile:[{
            name: 'IMG.png',
            state: 'done',
            size: 1024,
            downloadURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
            fileURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
            imgURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg'
  }],
  sequenceTable:[
    {
      name:'数据存储管理'
    }
  ],
  key:'',//当前选中的树节点
  fileID:'',//当前选中的处理文件的ID
}
//reducer可以接受state，但是不能修改state，所以必须要拷贝一份
const DataStoragereducer = (state=dataStorage,action)=>{
    
    /** vibration */
    if(action.type==='VibrationComponenDidMount'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.VibrationDataConfig=action.dataConfig
      return newState;
     }
    if(action.type==='VibrationchangeChild'){
     const newState=JSON.parse(JSON.stringify(state));
     newState.VibrationDataConfig=action.dataConfig
      return newState;
    }
     if(action.type==='VibrationdeleteChild'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.VibrationDataConfig=action.dataConfig
       return newState;
     }
     if(action.type==='VibrationaddChild'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.VibrationDataConfig=action.dataConfig
       return newState;
     }



    /** sequence */
    if(action.type==='SequenceComponenDidMount'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.SequenceDataConfig=action.dataConfig
      return newState;
     }
    if(action.type==='SequencechangeChild'){  //编辑时序节点
      const newState=JSON.parse(JSON.stringify(state));
      newState.SequenceDataConfig=action.dataConfig
       return newState;
     }
     if(action.type==='SequencedeleteChild'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.SequenceDataConfig=action.dataConfig
       return newState;
     }
     if(action.type==='SequenceaddChild'){ 
      const newState=JSON.parse(JSON.stringify(state));
      newState.SequenceDataConfig=action.dataConfig
       return newState;
     }

     if(action.type==='getSequenceTreekey'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.key=action.key
      newState.sequenceTable=action.tableList
      newState.sequenceFile=action.tableList
       return newState;
     }
     if(action.type==='sequenceFileComponenDidMount'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.sequenceFile=action.list
       return newState;
     }
     if(action.type==='sequenceFileUpload'){
      const newState=JSON.parse(JSON.stringify(state));
      Array.prototype.push.apply(newState.sequenceFile,action.list);
      Array.prototype.push.apply(newState.sequenceTable,action.list);
       return newState;
     }
//   DataStorage\Sequence\Table2\TabTable\Table.jsx    
     if(action.type==='sequenceFileID'){    //当前选择的文件ID
      const newState=JSON.parse(JSON.stringify(state));
      newState.fileID=action.id
      return newState;
     }
    


     /** image */
     if(action.type==='ImageComponenDidMount'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.ImageDataConfig=action.dataConfig
      return newState;
     }
     if(action.type==='ImagechangeChild'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.ImageDataConfig=action.dataConfig
       return newState;
     }
     if(action.type==='ImagedeleteChild'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.ImageDataConfig=action.dataConfig
       return newState;
     }
     if(action.type==='ImageaddChild'){
      const newState=JSON.parse(JSON.stringify(state));
      newState.ImageDataConfig=action.dataConfig
       return newState;
     }

    return state;  //state存放的是所有的信息，整个store仓库里存储的数据 action指用户传过来的那句话
   
}
export default DataStoragereducer