let dataConfig=[
  {
    label:'233',
    key:'22',
    path:'11',
    children:[
      {
        label:'2333',
        key:'223',
        path:'113',
      },
    ]
  }
]





/**
import $ from 'jquery'
let dataConfig10
let dataConfig1=[]
$.ajax({
  type:"get",
  url:"http://localhost:9001/equip/data/buildMenu",
  dataType:'JSON',
  async:false,
  success:function(res){
    if(res.flag){
     console.log(res)
     
     dataConfig10=res.data
    }
  },
  error:function(){

  }
})
if(dataConfig10){
  dataConfig10.map((item,index)=>{
    dataConfig1.push(item[0])
  })
}

let dataConfig2=JSON.parse(JSON.stringify(dataConfig1).replace(/"menuName"/g,' "label"'))  ;
 let dataConfig3=JSON.parse(JSON.stringify(dataConfig2).replace(/"id"/g,' "key"'))  ;
 let dataConfig=JSON.parse(JSON.stringify(dataConfig3).replace(/"child"/g,' "children"'))   ;
 */


export default dataConfig;
/** 
$.ajax({
  type: "GET",
  url: hostPort+'file/source/findAllDir',
  contentType: "application/json;charset=UTF-8",
  headers:{'Authorization':headerToken},
  dataType: 'JSON', 
  async: false,
  success: function(shuju){
    if(shuju.flag == true){
      //shuju.data.id=1100000000
      dataConfig1.push(shuju.data);
      console.log('20: 27')
      console.log(shuju.data)
      return false;
    }
  },
  error: function() { 
  alert("异常！"); 
  } 
 });
 let dataConfig2=JSON.parse(JSON.stringify(dataConfig1).replace(/"dirName"/g,' "label"'))  ;
 let dataConfig3=JSON.parse(JSON.stringify(dataConfig2).replace(/"id"/g,' "key"'))  ;
 let dataConfig4=JSON.parse(JSON.stringify(dataConfig3).replace(/"pId"/g,' "path"'))  ;
 let dataConfig=JSON.parse(JSON.stringify(dataConfig4).replace(/"child"/g,' "children"'))   ;
 
 export default dataConfig;
*/


 /**
 const data1 = [
  {
    name: '舵机',
    key: '/tree1',
    path:'1',
    child: [
     
      {
        name: '舵机1',
        key: '/tree1.1',
        path:'1',
        child: [
          {
            name: '舵机1',
            key: '/tree3.1',
            path:'1',
          },
        ],
      },
    ],
  },
];


let dataConfig1=JSON.parse(JSON.stringify(data1).replace(/"child"/g,'"children"'))  
let dataConfig=JSON.parse(JSON.stringify(dataConfig1).replace(/"name"/g,'"label"'))  
console.log('shu')
console.log(dataConfig)

export default dataConfig;
*/

/** 
let wosile=function(data){
  console.log('我死了')
  console.log(data)
  data.map((item,index)=>{
    console.log(item)
    
      $.ajax({
        type: "GET",
        url: 'http://localhost:9001/file/source/findByPId/'+item.id,
        contentType: "application/json;charset=UTF-8",
        headers:{'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6InJvb3QiLCJleHAiOjE1NjUzMDg5NTB9.Kw6yoGDWWr4LYuF8iLUP0OBTZStmkdglMtautwXQmM5yrj87ahBc0ystT18Rx2OA0RMAlT6Sp_Jd9IdRnwIM3w'},
        dataType: 'JSON', 
        async: false,
        success: function(shuju){
          item.child=shuju.data
          wosile(shuju.data)
          return false;
        },
        error: function() { 
        alert("异常！"); 
        } 
    });
  })
}

$.ajax({
  type: "GET",
  url: 'http://localhost:9001/file/source/findByPId/0',
  contentType: "application/json;charset=UTF-8",
  headers:{'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6InJvb3QiLCJleHAiOjE1NjUzMDg5NTB9.Kw6yoGDWWr4LYuF8iLUP0OBTZStmkdglMtautwXQmM5yrj87ahBc0ystT18Rx2OA0RMAlT6Sp_Jd9IdRnwIM3w'},
  dataType: 'JSON', 
  async: false,
  success: function(shuju){
     dataConfig1=shuju.data;
     wosile(dataConfig1) //


     return false;
  },
  error: function() { 
  alert("异常！"); 
  } 
 });




  const data1 = [
  {
    name: '舵机',
    key: '/tree1',
    path:'1',
    child: [
     
      {
        name: '舵机1',
        key: '/tree1.1',
        path:'1',
        child: [
          {
            name: '舵机1',
            key: '/tree3.1',
            path:'1',
          },
        ],
      },
      
    ],
  },
  
];


let dataConfig1=JSON.parse(JSON.stringify(data1).replace(/"child"/g,'"children"'))  
let dataConfig=JSON.parse(JSON.stringify(dataConfig1).replace(/"name"/g,'"label"'))  
console.log('shu')
console.log(dataConfig)

export default dataConfig;
*/