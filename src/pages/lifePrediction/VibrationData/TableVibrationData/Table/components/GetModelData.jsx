import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field,DatePicker, } from '@alifd/next';
import ModelCheckTable from '../../Table/components/ModelCheckTable/index'
const FormItem = Form.Item;

export default class GetModelData extends Component {
  static displayName = 'GetModelData';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
      record:'',
    };
    this.field = new Field(this);
  }
/**点击提交之后的方法 */
  handleSubmit = () => {
    const {record}=this.state
    const {failRate} =this.props
    this.props.chooseRow(record[0].modelName)
    this.setState({
      visible: false,
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record }); //将field中的数据设成为record
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

  /**子组件Ftable中的方法 */
  chooseRow=(selectedRowKeys,records)=>{
  
    console.log('22:30',selectedRowKeys,records)
    this.setState({
      record:records,
    });
    this.props.chooseRow(selectedRowKeys,records)
  }

  render() {
    const init = this.field.init;
    const { index, record } = this.props;  //父组件传过来的index和record
    const formItemLayout = {
      labelCol: {    //控制第一级 Item 的 labelCol
        fixedSpan: 6,
      },
      wrapperCol: {   //控制第一级 Item 的 wrapperCol	
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button
          size="small"
          type="primary"
          onClick={() => this.onOpen(index, record)}
          style={{marginLeft: 10}}
        >
          选择
        </Button>
        <Dialog
          style={{ width: 880 }}
          visible={this.state.visible}  //通过在这儿的设置，实现了是否使得视图可见
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title=""
        >
       <ModelCheckTable chooseRow={this.chooseRow}></ModelCheckTable>  
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
