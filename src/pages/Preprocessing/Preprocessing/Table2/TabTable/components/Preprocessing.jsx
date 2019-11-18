import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,Select } from '@alifd/next';

const FormItem = Form.Item;
const Option = Select.Option;
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
      console.log('16:30',values);   //这儿会输出打印的是表单里的数据
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      const { dataIndex } = this.state;
     // this.props.newRow(dataIndex, values);  //父组件中定义的方法，在子组件中用，直接获取数据。
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
          数据预处理
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}  //通过在这儿的设置，实现了是否使得视图可见
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="数据预处理"
        >
          <Form field={this.field}>
            <FormItem label="预处理算法：" {...formItemLayout}>
                    <Select  
                    {...init('algorithm', {
                     
                    })}
                    style={{width: '100%'}}>
                            <Option value="small">算法1</Option>
                            <Option value="medium">算法2</Option>
                            <Option value="large">算法3</Option>
                    </Select>
            </FormItem>

            <FormItem label="采样通道：" {...formItemLayout}>
                  <Select  style={{width: '100%'}}>
                            <Option value="small">采样通道1</Option>
                            <Option value="medium">采样通道2</Option>
                            <Option value="large">采样通道3</Option>
                    </Select>
            </FormItem>

            <FormItem label="采样次数：" {...formItemLayout}>
              <Input
                {...init('productModel', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="发布时间：" {...formItemLayout}>
              <Input
                {...init('productType', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="新建日期：" {...formItemLayout}>
              <Input
                {...init('createDate', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="新建人：" {...formItemLayout}>
              <Input
                {...init('createPerson', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="描述：" {...formItemLayout}>
              <Input
                {...init('describe', {
                  rules: [{ required: true, message: '必填选项' }],
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
