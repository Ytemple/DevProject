import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import data from './data';
import {Button} from '@alifd/next';
import { Link } from 'react-router-dom';
import Preprocessing from './components/Preprocessing';
import PropTypes from 'prop-types';

let i=10000;
export default class Table extends Component {
  static displayName = 'Table';
 
  static propTypes = {};

  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource:data
    };

    

    this.columns = [
      
      {
        title: '数据集名称',
        dataIndex: 'dataSetName',
        key: 'name',
      },
      {
        title: '算法',
        dataIndex: 'algorithm',
        key: 'algorithm',
      },
      {
        title: '神经元个数',
        dataIndex: 'neuronsNumber',
        key: 'neuronsNumber',
      },
      {
        title: '卷积层数',
        dataIndex: 'convolutionalLayers',
        key: 'convolutionalLayers',
      },
      {
        title: '池化层数',
        dataIndex: 'poolingLayers',
        key: 'poolingLayers',
      },
      {
        title: '学习率',
        dataIndex: 'learningRate',
        key: 'learningRate',
      },
      {
        title: '训练时间',
        dataIndex: 'trainingTime',
        key: 'trainingTime',
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
              <Preprocessing />


            </span>
          );
        },
      },
    ];
  }

 
/**编辑 */
  getFormValues = (dataIndex, values) => {
   
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;  //将修改后的表单数据响应的赋值进去。
    this.setState({
      dataSource,
    });
    
  this.props.changeChild(values.childNode,values.componentCode,this.props.childrenData[dataIndex].treeTableKey); 
  };
/**删除 */
  handleRemove = (value, index) => {
    //this.props.deleteChild(this.state.dataSource[index],index);
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    this.setState({
      dataSource,
    });
  };
  /**新增 */
  addTable1=()=>{
    i++
    this.state.dataSource.push({
      childNode: '新增',
      componentCode: '新增',
      treeTableKey:i
    });
    
    this.setState({
      dataSource: this.state.dataSource,
    });
    let index =this.state.dataSource.length-1
    this.props.addChild(123)
  }


  render() {
    const { dataSource } = this.state;
    return (
        <div>
            
        <IceContainer>          
                  <CustomTable
                    dataSource={dataSource}
                    columns={this.columns}
                    hasBorder={false}
                  />               
        </IceContainer>
        </div>
    );
  }
}
