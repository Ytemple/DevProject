import { Upload, Button } from '@alifd/next';
import React, { Component } from 'react';
import $ from 'jquery'
import  {headerToken,hostPort} from '../../../../Common'
import store from '../../../Store/index'
let i = 100
const defaultValue = [
];

export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueList: store.getState().DataStoragereducer.sequenceFile,
        };
        store.subscribe(this.handleStoreChange);
    }
    handleStoreChange=()=>{
        this.setState({
            valueList: store.getState().DataStoragereducer.sequenceFile,
        })
     //   console.log('sequence changed', store.getState().DataStoragereducer.SequenceDataConfig)
    }
    componentDidMount(){
        let file={
            name: 'IMG.png',
            state: 'done',
            size: 1024,
            downloadURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
            fileURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
            imgURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg'
        }
        let list=[]
        $.ajax({
          type:"POST",
          url:hostPort+"equip/file/selectPage",
          contentType:"application/json;charset=UTF-8",
          dataType:'JSON',
          async:false,
          data:JSON.stringify({
            "pageNo":1,
            "pageSize":100,
            "queryParameter":
            {
              "dataId":this.props.pid,
            }
          }),
          success:function(res){
            if(res.flag){
                 res.data.pageList.map((item,index)=>{
                     list.push({
                         id:item.id,
                         name:item.fileName,
                         downloadURL:hostPort+'equip/file/download/'+item.id
                     })
                  // console.log('19:25',list)
                 })
            }
          },
          error:function(){
          }
        })
        if(list){
            const action ={
                type:'sequenceFileComponenDidMount',
                list
              }
            store.dispatch(action)
        }
        
    }  

    beforeUpload = () => {
    }
    onChange = () => {
    }
    onRemove = (file, value) => {
        console.log('12.19 17:20',file,value)
        $.ajax({
            type:"delete",
            url:hostPort+"equip/file/delete/"+file.id,
            contentType:"application/json;charset=UTF-8",
            dataType:'JSON',
            async:false,
            
            success:function(res){
             console.log('22:45',res)
            },
            error:function(){
            }
          })
    }
    onSuccess = (file, value) => {
        let newFile={
        }
        let list=[]
        let tableList = []
       if(file.response.flag){
        list.push({
            id:file.response.data.id,
            name:file.response.data.fileName,
            downloadURL:hostPort+'equip/file/download/'+file.response.data.id
        })

        const action ={
            type:'sequenceFileUpload',
            list
          }
        store.dispatch(action)
    }
    }
    render() {
        return (
            <div  style={styles.title} >
                <Upload
                    action={hostPort+"/equip/file/upload"}
                    data={{
                        dataId:this.props.pid,
                        dataType:2
                    }}
                    beforeUpload={this.beforeUpload}
                    onRemove={this.onRemove}
                    onChange={this.onChange}
                    onSuccess={this.onSuccess}
                    listType="text"
                    value={this.state.valueList}
                >
                    <Button type="primary" style={{margin: '0 0 10px'}}>Upload File</Button>
                </Upload>
            </div>);
    }
}
const styles = {
    title: {
      marginTop: '10px',
    },
  };


/** 
export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueList: defaultValue,
        };
    }

    beforeUpload = () => {
        
    }
    onChange = () => {
        
    }
    onRemove = (file, value) => {
       
        $.ajax({
            type: "delete",
            url: hostPort+'file/source/delete/' + file.id,
            contentType: "application/json;charset=UTF-8",
            headers: { 'Authorization': headerToken },
            dataType: 'JSON',
            async: true,
            success: function (shuju) {
                //console.log(shuju)
            },
            error: function () {
                alert("异常！");
            }
        });
    }
    onSuccess = (file, value) => {
        console.log('8.21 11:25')
        console.log(file)
        console.log(value)
        i++;
       
        const { valueList } = this.state;
        let newList = {
            id: file.response.data.id,
            name: file.response.data.fileName,
            state: 'done',
            pid: file.response.data.id,
            imgURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
            downloadURL: hostPort+'file/source/findByPId/' + file.response.data.id,
            createTime: file.response.data.createTime,
            updateTime: file.response.data.updateTime,
            isDeleted: file.response.data.isDeleted,
        };
        valueList.push(newList)
    }

    render() {
        return (
            <div  style={styles.title} >
                <Upload
                    action={hostPort+'file/source/upload'}
                    data={{
                        pId: this.props.pid,
                    }}
                    headers={{
                        dataType: 'Form-data',
                    }}
                    beforeUpload={this.beforeUpload}
                    onChange={this.onChange}
                    onRemove={this.onRemove}
                    onSuccess={this.onSuccess}
                    listType="text"
                    value={this.props.FileValue}>

                    <Button type="primary" style={{ margin: '0 0 10px' }}>文件上传</Button>
                </Upload>
            </div>);
    }
}
const styles = {
    title: {
      marginTop: '10px',
    },
  };
*/
