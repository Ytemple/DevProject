import { Upload, Button } from '@alifd/next';
import React, { Component } from 'react';
import $ from 'jquery'
import  {headerToken,hostPort} from '../../../Common'

let i = 100
const defaultValue = [
];

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
    }
    onSuccess = (file, value) => {
    }
    render() {
        return (
            <div  style={styles.title} >
                <Upload
                    action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
                    beforeUpload={this.beforeUpload}
                    onChange={this.onChange}
                    onSuccess={this.onSuccess}
                    listType="text"
                    
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
