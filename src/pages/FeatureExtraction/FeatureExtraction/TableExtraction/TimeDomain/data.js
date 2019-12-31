import $ from  'jquery';

/** 
let newURL = 'https://www.apiopen.top/weatherApi?city=武汉';
console.log(newURL);
var xhr = new XMLHttpRequest();
xhr.open('GET',newURL,false);
xhr.send();
xhr.onreadystatechange = function(){
  console.log(1);
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            let weatherInfo = JSON.parse(xhr.responseText);
            console.log(weatherInfo);
            data2=weatherInfo.data.city;
            return false;
        }
        else{
            alert('失败！')
        }
        return false
    }
    data3=3;
    return false
}
*/
//为什么使用ajax就可以，但是使用传统的方法就不行了呢
let data =  [{
  name:'数据名称',
  approach:'处理方法',
  result:'处理结果'
}];

 
/**
$.ajax({
  type: "GET",
  url: 'https://www.apiopen.top/weatherApi?city=武汉',
  dataType: 'JSON', 
  async: false,
  success: function(item){
    for(var i=0;i<item.data.forecast.length;i++){
    data.push  (
      {

        engineerName: item.data.forecast[i].date,
        engineerClasses: item.data.forecast[i].high,
        productModel:item.data.forecast[i].fengli,
        productType: item.data.forecast[i].low,
        createDate: item.data.forecast[i].fengxiang,
        createPerson: item.data.forecast[i].type,
        describe: i,
      },
      )
    }	
    return false;
  },
  error: function() { 
     alert("异常！");  
  }  
});

 */

  

export default data;
