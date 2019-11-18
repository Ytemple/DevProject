import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,Select } from '@alifd/next';
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
      //console.log(values);   //这儿会输出打印的是表单里的数据
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      const { dataIndex } = this.state;
      this.props.newRow(dataIndex, values);  //父组件中定义的方法，在子组件中用，直接获取数据。
    //  console.log(dataIndex);  //打印输出0，1，2
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
        特征筛选
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}  //通过在这儿的设置，实现了是否使得视图可见
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="特征筛选"
        >
          <Form field={this.field}>

          <FormItem label="特征筛选方法：" {...formItemLayout}>
                    <Select  style={{width: '100%'}}>
                            <Option value="small">算法1</Option>
                            <Option value="medium">算法2</Option>
                            <Option value="large">算法3</Option>
                    </Select>
            </FormItem>

            <FormItem label="特征贡献率系数：" {...formItemLayout}>
                  <Select style={{width: '100%'}}>
                            <Option value="0.1">0.1</Option>
                            <Option value="medium">0.2</Option>
                            <Option value="0.2">0.3</Option>
                            <Option value="0.3">0.4</Option>
                            <Option value="0.4">0.5</Option>
                            <Option value="0.5">0.6</Option>
                            <Option value="0.6">0.7</Option>
                            <Option value="0.7">0.8</Option>
                            <Option value="0.8">0.9</Option>
                            <Option value="0.9">1</Option>
                    </Select>
            </FormItem>

            <FormItem label="特征源：" {...formItemLayout}>
            <Select style={{width: '100%'}}>
                            <Option value="small">时域特征</Option>
                            <Option value="medium">频域特征</Option>
                            <Option value="large">时频域特征</Option>
                            <Option value="large">时序特征</Option>
                    </Select>
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
