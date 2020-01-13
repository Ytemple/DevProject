import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,Select,NumberPicker } from '@alifd/next';
const FormItem = Form.Item;
const Option = Select.Option;
const data={
  modelName:'',
  algorithm:'',
  neuronsNumber:'',
  convolutionalLayers:'',
  poolingLayers:'',
  learningRate:'',
}
export default class Preprocessing extends Component {
  static displayName = 'Preprocessing';

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
     console.log('16:26',values);   //这儿会输出打印的是表单里的数据
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.props.handleSubmit(values)
      const { dataIndex } = this.state;
      console.log(dataIndex);  //打印输出0，1，2
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
         模型训练
        </Button>
        <Dialog
          style={{ width:700 }}
          visible={this.state.visible}  //通过在这儿的设置，实现了是否使得视图可见
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="模型训练"
        >
          <Form field={this.field}>
           
            <FormItem label="模型名称：" {...formItemLayout}>
              <Input
                {...init('modelName', {
                  rules: [{  message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="算法：" {...formItemLayout}>
              <Input
                {...init('algorithm', {
                  rules: [{  message: '必填选项' }],
                })}
              />
            </FormItem>
            
            <FormItem label="神经元个数：" {...formItemLayout}>
            <NumberPicker 
            {...init('neuronsNumber', {
                  rules: [{ 
                  //  required: true, 
                    message: '必填选项' }],
                })}
            defaultValue={0} type="inline" />
            </FormItem>

            <FormItem label="卷积层数：" {...formItemLayout}>
            <NumberPicker 
            {...init('convolutionalLayers', {
                  rules: [{ 
                  //  required: true, 
                    message: '必填选项' }],
                })}
            defaultValue={0} type="inline" />
            </FormItem>

            <FormItem label="池化层数：" {...formItemLayout}>
            <NumberPicker 
            {...init('poolingLayers', {
                  rules: [{ 
                  //  required: true, 
                    message: '必填选项' }],
                })}
            defaultValue={0} type="inline" />
            </FormItem>

            <FormItem label="学习率：" {...formItemLayout}>
              <Input
                {...init('learningRate', {
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
