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
import PropTypes from 'prop-types';

let i=10000;
export default class Table1 extends Component {
  static displayName = 'Table1';
 
  static propTypes = {};

  static defaultProps = {};
  
  constructor(props) {
    super(props);
    let  childrenData=this.props.childrenData;

    this.state = {
      dataSource: childrenData,
    };
    this.columns = [
      {
        title: '子文件夹',
        dataIndex: 'childNode',
        key: 'childNode',
      },
      {
        title: '所属设备',
        dataIndex: 'childNode',
        key: 'childNode',
      },
      {
        title: '样品单位',
        dataIndex: 'childNode',
        key: 'childNode',
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
              <Link to="/List">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => this.handleProcess(index, record)}
                >
                  流程
                </Button>
              </Link>
              
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
    this.props.deleteChild(this.state.dataSource[index],index);
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
    this.props.addChild();
  }
/**流程 */
  handleProcess=(index, record)=>{
    
  }

  render() {
    const { dataSource } = this.state;
    return (
        <div>
              <Button size="small" type="secondary" shape="warning"
              onClick={this.addTable1}
              >
                新增
              </Button>
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
