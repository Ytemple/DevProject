import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,Select,NumberPicker } from '@alifd/next';
import SelectableTable from './SelectableTable/index'
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
     console.log('16:26',values);   //这儿会输出打印的是表单里的数据
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

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
         打标注
        </Button>
        <Dialog
          style={{ width:700 }}
          visible={this.state.visible}  //通过在这儿的设置，实现了是否使得视图可见
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="打标注"
        >
          <Form field={this.field}>

          <FormItem label="故障类型：" {...formItemLayout}>
                    <Select  style={{width: '100%'}}>
                            <Option value="small">正常</Option>
                            <Option value="medium">内圈故障</Option>
                            <Option value="large">外圈故障</Option>
                            <Option value="large">外圈正常</Option>
                    </Select>
            </FormItem>

            <FormItem label="标签类型：" {...formItemLayout}>
                  <Select  style={{width: '100%'}}>
                            <Option value="small">1</Option>
                            <Option value="medium">2</Option>
                            <Option value="large">3</Option>
                    </Select>
            </FormItem>

            <FormItem label="采样频率：" {...formItemLayout}>
            <NumberPicker 
            {...init('productModel', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
            defaultValue={0} type="inline" />
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
