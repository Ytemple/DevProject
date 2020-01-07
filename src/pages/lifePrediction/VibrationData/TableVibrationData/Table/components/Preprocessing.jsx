import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,Select,Upload,NumberPicker } from '@alifd/next';
import GetModelData from './GetModelData'
const FormItem = Form.Item;
const Option = Select.Option;
const defaultValue ={
  'dataSetName':1,
  'modelDataSet':2
}

export default class Preprocessing extends Component {
  static displayName = 'Preprocessing';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
      record:defaultValue
    };
    this.field = new Field(this);
    this.field.setValues(this.state.record);
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

  beforeUpload=(info)=> {
    console.log('beforeUpload : ', info);
  }

  onChange=(info)=> {
      console.log('onChange : ', info);
  }
  
  onSuccess=(info)=> {
      console.log('onSuccess : ', info);
  }

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
         寿命预测
        </Button>
        <Dialog
          style={{ width:700 }}
          visible={this.state.visible}  //通过在这儿的设置，实现了是否使得视图可见
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="寿命预测"
        >
          <Form field={this.field}>
          {/** 
          <FormItem label="数据集名称：" {...formItemLayout}>
              <Input
                {...init('dataSetName', {
                  rules: [{  message: '必填选项' }],
                })}
              />
            </FormItem>
          */}
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
          <Upload
              action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
              beforeUpload={this.beforeUpload}
              onChange={this.onChange}
              onSuccess={this.onSuccess}
              listType="text"
            // defaultValue={defaultValue}
             >
              <Button type="primary" style={{marginLeft: ' 20px',marginTop: ' 10px',marginBottom: ' 10px'}}>上传文件</Button>
          </Upload>
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
