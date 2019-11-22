import { Tree ,Search} from '@alifd/next';
import React, { Component } from 'react';
import $ from 'jquery'
//import dataConfig from './dataConfig'
import PropTypes from 'prop-types';
//const data=dataConfig;

export default class TreeIndex extends Component {
   

static displayName = 'TreeIndex';
static propTypes = {};

static defaultProps = {};

static contextTypes={
    //getTreekey:PropTypes.func,
  }
constructor(props) {
  super(props);
  let data=this.props.dataConfig;
  this.state = {
    selectedKey:'',
    data:data,  //数列表的数据
    expandedKeys: ['2'],  //控制的是展开的节点的key值
    autoExpandParent: true//是否自动展开父节点
  };
  this.matchedKeys = [];
}


onSelect = (selectedKeys, node) => {
    const {selectedKey} =this.state;
   
    if(selectedKeys[0]){  //在这个地方判断的是是否选中了节点，如果节点选择重复，那么节点就是undefined，通过这个判断，就可以解决。
       
        this.props.onSelectBlock(selectedKeys[0]);  //父组件中定义的方法，在子组件中用，直接获取数据。
        
        this.props.getChildrenData(selectedKeys[0],this.state.data);
        this.props.getTreekey(selectedKeys)
        this.setState({
            selectedKey:selectedKeys[0],
        })
    }else{
        //alert('树节点选取重复')
    }
};

    handleSearch=(value)=> {
        const {data } = this.state;
        console.log('7.15')
        console.log(data)
        value = value.trim();
        if (!value) {
            this.matchedKeys = null;
            return;
        }

        const matchedKeys = [];
        const loop = data => data.forEach(item => {
            if (item.label.indexOf(value) > -1) {
                matchedKeys.push(""+item.key+"");
            }
            if (item.children && item.children.length) {
                loop(item.children);
            }
        });
        loop(data);
      //  console.log(matchedKeys)
        this.setState({
            expandedKeys: [...matchedKeys],
            autoExpandParent: true
        });
        this.matchedKeys = matchedKeys;
    }

    handleExpand=(keys)=> {
        this.setState({
            expandedKeys: keys,
            autoExpandParent: false
        });
    }
    

    render() {
        
        const { expandedKeys, autoExpandParent } = this.state;
        const filterTreeNode = node => {
            return this.matchedKeys && this.matchedKeys.indexOf(node.props.eventKey) > -1;
        };

        return (
            <div>
               <Tree 
                expandedKeys={expandedKeys}  // 展开的节点
                autoExpandParent={autoExpandParent}
                onSelect={this.onSelect}
                filterTreeNode={filterTreeNode}
                onExpand={this.handleExpand}
                dataSource={this.state.data}
                />
               {/**  <Search shape="simple" size="small"  onChange={this.handleSearch} />   */}
                
            </div>
            
        );
    }
}

