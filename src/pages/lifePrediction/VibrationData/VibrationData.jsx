import React, { Component, PureComponent } from 'react';
import $ from 'jquery'
import TreeIndex from './TreeIndex/index';
import { Dialog, Button, Form, Input, Field,Select,Upload,NumberPicker } from '@alifd/next';
import dataConfig from './TreeIndex/dataConfig'
import TableVibrationData from './TableVibrationData/index'
import Table from './TableVibrationData/Table/index'
let data1 = [];
let n1 = 1111;
let i = 100000000

const defaultValue = [   //在这里定义文件列表中要显示的数据
];


export default class VibrationData extends Component {

  static displayName = 'VibrationData';
  static contextTypes = {
  }
  constructor(props) {
    super(props);
    /**在这儿设置一下state，获取值，然后再通过this.state来调用这个值 */
    this.state = {
      displayName: 'none',
      childrenData: data1,  //table1中的数据
      dataConfig: dataConfig,
      treeKey: '',  //当前选中的树节点
      number: n1,  //给number写一个异步的
      FileValue: defaultValue,
    };
  }

  /**通过单击，来设置display，决定是否展现组件 */

  onSelectBlock = (url) => {
    this.setState({
      displayName: 'block',
      key: url,
    })
  }

  /**用来重置树节点的children节点中的信息 table1 */
  getChildrenData = (key, shuju) => {
    shuju.map((item, i) => {
      if (key == item.key) {
        if (item.children) {
          for (i = 0; i < item.children.length; i++) {
            data1.splice(0,data1.length);
            data1.push(
              {
                childNode: item.children[i].label,
                treeTableKey: item.children[i].key,
                componentNo: item.children[i].engineerId,
                componentCode: item.children[i].componentNo,
                sum: item.children[i].createTime,
                createPerson: item.children[i].updateTime,
              },
            )
            this.setState({
              childrenData: data1,
            });
          }
        }
      }
      if (item.children) {
        this.getChildrenData(key, item.children);
      } else {
      }
    })
  }

 
  /** 获取树节点     同时获取文件列表中的值*/
  getTreekey = (Key) => {
    const valueList = [
    ];
   
    this.setState({
      treeKey: Key[0],
      FileValue: valueList
    })
  }

 

  render() {
    return (
      <div className="home-page" style={styles.homePage}>
        <TreeIndex
          dataConfig={this.state.dataConfig}
          onSelectBlock={this.onSelectBlock}
          getChildrenData={this.getChildrenData}
          getTreekey={this.getTreekey}  //一个是获取树节点，还有就是通过获取的这个树节点去获取文档列表
        ></TreeIndex>
        <div style={{ display: this.state.displayName }}>
      <Table></Table>
        </div>
      </div>
    );
  }
}

const styles = {
  homePage: {   //在这儿就设置了弹性，所以才有了后来项目的弹性
    display: 'flex',
    flexDirection: 'row',
    //height: '100vh',
  },
  mainContent: {   //这个我没有找到，这个是用来设置弹性项目的
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'auto',
  },
  table: {
    display: 'block',
  }
};

