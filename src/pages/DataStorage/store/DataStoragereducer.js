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
  ]
}
//reducer可以接受state，但是不能修改state，所以必须要拷贝一份
const DataStoragereducer = (state=dataStorage,action)=>{
    if(action.type===CHANGE_INPUT_VALUE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.inputValue=action.value;
        return newState;  //返回的数据给到了store
    }
    if(action.type===ADD_TODO_ITEM){
        const newState=JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue='';
        console.log(newState)
        return newState;
    }
    if(action.type===DELETE_TODO_ITEM){
        const newState=JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index,1)
        return newState;
    }
    
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
    if(action.type==='SequencechangeChild'){
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