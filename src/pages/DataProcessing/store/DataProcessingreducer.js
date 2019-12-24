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
   /** 表示的是拖拽窗口中的数据，在进行拖拽时，数据发生变化     dataprocessing/drag/components/boardlist/index    */
    if(action.type==='shouldReceiveNewData'){
       let newState=JSON.parse(JSON.stringify(state));
       newState.cardData=action.nextData
       newState.cardData.lanes[1].cards.map((item,index)=>{
        item.sequence=index   //在执行列表一栏中，按照先后顺序，赋给它们这个顺序值
       })
       return newState;
    }
/** 初始化加载 */
    if(action.type==='componentDidMountModel'){
      let newState=JSON.parse(JSON.stringify(state));
      if(action.list){
        newState.list=action.list
      }
      return newState;
    }


    /** 执行模型    dataprocessing/list/modelcards/index.jsx  */
    if(action.type==='executeModel'){
      let newState=JSON.parse(JSON.stringify(state));
      newState.step.step=0
      newState.list.map((item,index)=>{
        if(item.id==action.index){
          newState.cardData.lanes[1].cards=newState.list[index].cards//把列表中的cards赋值给执行顺序列表中      
          newState.step.cardIndex=index
        }
      })
      
      return newState;
    }
     /** 删除保存的模型列表       dataprocessing/list/modelcards/index.jsx*/
   if(action.type==='deleteModel'){
    let newState=JSON.parse(JSON.stringify(state));
    console.log('17:09',newState)
    newState.list.map((item,index)=>{
      if(item.id==action.index){
        newState.list.splice(index,1)
      }
    })
    return newState;
   }
    /** 创建新的模型       dataprocessing/list/modelcards/index.jsx*/
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
   /**保存要执行的模型   dataprocessing/dataprocessing.jsx   */
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