import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@alifd/next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import data from '../data'
const FormItem = Form.Item;

export default class NewDialog extends Component {
  static displayName = 'NewDialog';

  static defaultProps = {};
  static contextTypes={
    getKey:PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
    };
    this.field = new Field(this);
  }

  onOpen = (index, record,value) => {
    this.field.validate((errors, values) => {
      console.log(values);   //这儿会输出打印的是表单里的数据
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
    });

    this.field.validate((errors, values) => {
      console.log('i want to see values')
      console.log(index)
    })
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      dataIndex: index,
    });
    this.context.getKey(data[index].id)
    
    console.log('正在测试')
    console.log(value)
  };

 open=(index, record,value)=>{
    this.onOpen(index, record,value)
 }

  render() {
    const init = this.field.init;
    const { index, record,value } = this.props;
  
    return (
      <div style={styles.editDialog}>
        <Link to="/treeTwo" >
        <Button
          size="small"
          type="primary"
          onClick={() => this.open(index, record,value)}
        >
          打开
        </Button>
        </Link>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};

