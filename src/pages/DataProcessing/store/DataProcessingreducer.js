import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM} from '../store/actionType'



const defaultState = {
    cardData:{
        lanes: [
            {
              id: '1',
              title: '选择列表',
              cards: [
                {
                  id: 1,
                  title: '数据预处理',
                  description: '数据预处理',
                },
                {
                  id: 2,
                  title: '特征提取',
                  description: '特征提取',
                  metadata: { sha: 'be312a1' },
                },
                {
                  id: 3,
                  title: '特征筛选',
                  description: '特征筛选',
                  metadata: { sha: 'be312a1' },
                },
                {
                  id: 4,
                  title: '时频图像转换',
                  description: '时频图像转换',
                  metadata: { sha: 'be312a1' },
                },
                {
                  id: 5,
                  title: '标签管理',
                  description: '标签管理',
                  metadata: { sha: 'be312a1' },
                },
                {
                  id: 6,
                  title: '数据集构建',
                  description: '数据集构建',
                  metadata: { sha: 'be312a1' },
                },
                {
                  id: 7,
                  title: '模型训练',
                  description: '模型训练',
                  metadata: { sha: 'be312a1' },
                },
                {
                  id: 8,
                  title: '模型校验',
                  description: '模型校验',
                  metadata: { sha: 'be312a1' },
                },
              ],
            },
            {
              id: '2',
              title: '执行顺序',
              cards: [
              ],
            },
          ],
    },
    step:{
      step:0,
      cardIndex:''
    },
   
    list:[
      {
        id: 1,
        title: 'hhh',
        cards: [
          {
          id: 1,
          title: '数据预处理',
          description: '数据预处理',
        },
        {
          id: 2,
          title: '特征提取',
          description: '特征提取',
          metadata: { sha: 'be312a1' },
        },
        ],
      },
    ]
    
}
//reducer可以接受state，但是不能修改state，所以必须要拷贝一份
const DataProcessingreducer = (state=defaultState,action)=>{
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
    if(action.type==='shouldReceiveNewData'){
       let newState=JSON.parse(JSON.stringify(state));
       newState.cardData=action.nextData
       newState.cardData.lanes[1].cards.map((item,index)=>{
        item.sequence=index   //在执行列表一栏中，按照先后顺序，赋给它们这个顺序值
       })
       return newState;
    }
    if(action.type==='executeModel'){
      let newState=JSON.parse(JSON.stringify(state));
      newState.step.step=0
      newState.cardData.lanes[1].cards=newState.list[action.index].cards//把列表中的cads赋值给执行顺序列表中
      
      newState.step.cardIndex=action.index
      return newState;
    }
   if(action.type==='deleteModel'){
    let newState=JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index,1)
    return newState;
   }
   if(action.type==='NewModel'){
    let newState=JSON.parse(JSON.stringify(state));
    newState.list.push(action.newList)
    return newState;
   }



   if(action.type==='nextStep'){   //步骤栏执行下一步
    let newState=JSON.parse(JSON.stringify(state));
    newState.step.step++
    return newState;
   }
   if(action.type==='prevStep'){   //步骤栏执行上一步
    let newState=JSON.parse(JSON.stringify(state));
    newState.step.step--
    if(newState==0){
      newState=0
    }
    return newState;
   }
   if(action.type==='handleSave'){
    let newState=JSON.parse(JSON.stringify(state));
    newState.list[newState.step.cardIndex].cards=newState.cardData.lanes[1].cards;
    Array.prototype.push.apply(newState.cardData.lanes[0].cards,newState.cardData.lanes[1].cards)

    console.log('10:59',newState)
    return newState;
   }
   
    return state;  //state存放的是所有的信息，整个store仓库里存储的数据 action指用户传过来的那句话
}
export default DataProcessingreducer