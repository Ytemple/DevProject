import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import data from './data';
import {Button} from '@alifd/next';
import { Link } from 'react-router-dom';
import NewDialog from './components/NewDialog';


const config = [
];


let num=1


export default class TabTable extends Component {
  static displayName = 'TabTable';
   
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: data,
      numa:num,
    };
    this.columns = [
      {
        title: '文件名',
        dataIndex: 'engineerName',
        key: 'engineerName',
      },
      {
        title: '所属设备',
        dataIndex: 'stage',
        key: 'stage',
      },
      {
        title: '样品单位',
        dataIndex: 'engineerClasses',
        key: 'engineerClasses',
      },
      {
        title: '实验方式',
        dataIndex: 'productModel',
        key: 'productModel',
      },
                                                                                   
      {
        title: '创造时间',
        dataIndex: 'productType',
        key: 'productType',
      },                                                                       
      
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;  //将修改后的表单数据响应的赋值进去。
    this.setState({
      dataSource,
    });
  };
 
  handleRemove = (value, index) => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    
    this.setState({
      dataSource,
    });
     
  };

  newRow = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource.splice(dataIndex+1, 0,values);
    this.setState({
      dataSource,
    });
  };

  handleFilter = (value) => {
    const { dataSource } = this.state;
    let newDatasouce=dataSource.filter(array => array.engineerName===value.bookName);
    this.setState({
      dataSource:newDatasouce
    });
  };

  handleSend = () => {
    const { dataSource,numa } = this.state;
    this.setState({
      dataSource,
      numa:3
    });
  };

  render() {
    return (
        <div>
        <Button onClick={this.handleSend}>数据预处理</Button>
        <IceContainer>          
                  <CustomTable
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    hasBorder={false}
                  />               
        </IceContainer>
       
        </div>
    );
  }
}
