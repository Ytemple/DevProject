import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,Select,NumberPicker } from '@alifd/next';
import SelectableTable from './SelectableTable/index'
import GetModelData from '../../../../../LifePrediction/VibrationData/TableVibrationData/Table/components/GetModelData'
const FormItem = Form.Item;
const Option = Select.Option;
const defaultRecord ={
  'algorithm':'算法1',
  'dataSetName':'数据集',
  'modelDataSet':'模型'
}
export default class Preprocessing extends Component {
  static displayName = 'Preprocessing';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
      record:defaultRecord
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
    this.field.setValues(this.state.record);
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

  chooseRow=(data)=>{
    this.state.record.modelDataSet=data
     this.setState({
      // record:records,
     });
     this.field.setValues(this.state.record);
   }

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
         模型校验
        </Button>
        <Dialog
          style={{ width:700 }}
          visible={this.state.visible}  //通过在这儿的设置，实现了是否使得视图可见
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="模型校验"
        >
          <Form field={this.field}>

          <FormItem label="算法：" {...formItemLayout}>
                    <Select  
                     {...init('algorithm', {
                        rules: [{ required: true, message: '必填选项' }],
                     })}
                    style={{width: '100%'}}>
                            <Option value="small">CNN</Option>
                            <Option value="medium">CNN</Option>
                            <Option value="large">CNN</Option>
                            <Option value="large">CNN</Option>
                    </Select>
            </FormItem>

          <FormItem label="数据集名称：" {...formItemLayout}>
              <Input
                {...init('dataSetName', {
                  rules: [{  message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="模型选择：" {...formItemLayout}>
              <Input
                {...init('modelDataSet', {
                  rules: [{  message: '必填选项' }],
                })}
                disabled
                style={{width: 300}}
              />
              <GetModelData chooseRow={this.chooseRow}/>
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
