 import $ from  'jquery';
let data =  [];
/** 
$.ajax({
  type: "GET",
  url: 'https://www.apiopen.top/weatherApi?city=武汉',
  dataType: 'JSON', 
  async: false,
  success: function(shuju){
    shuju.data.forecast.map((item, i) => {
      data.push  (
        {
          stage:item.date,
          engineerName: item.date,
          engineerClasses: item.high,
          productModel:item.fengli,
          productType: item.low,
          createDate: item.fengxiang,
          createPerson: item.type,
          describe: i+1,
          id:i
        },
      )
    });
    return false;
  },
  error: function() { 
     //alert("异常！");  
  }  
});
*/
    
export default data;

