import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@alifd/next';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';
  /** 
  static contextTypes={
    changeChild:PropTypes.func,
  }
  */
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,

    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
     // console.log(values);   //这儿会输出打印的是表单里的数据
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values);  //父组件中定义的方法，在子组件中用，直接获取数据。
      this.context.changeChild(values.childNode,values.componentCode,values.treeTableKey); 
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      dataIndex: index,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const init = this.field.init;
    const { index, record } = this.props;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(index, record)}
        >
          编辑
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}  //通过在这儿的设置，实现了是否使得视图可见
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          <Form field={this.field}>
            <FormItem label="子文件夹：" {...formItemLayout}>
              <Input
                {...init('childNode', {
                  rules: [{ message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="所属设备：" {...formItemLayout}>
              <Input
                {...init('componentCode', {
                  rules: [{  message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="样品单位：" {...formItemLayout}>
              <Input
                {...init('componentCode', {
                  rules: [{  message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="实验方式：" {...formItemLayout}>
              <Input
                {...init('componentCode', {
                  rules: [{  message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="创造时间：" {...formItemLayout}>
              <Input
                {...init('componentCode', {
                  rules: [{  message: '必填选项' }],
                })}
              />
            </FormItem>

          </Form>
        </Dialog>
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
