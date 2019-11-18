import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field } from '@alifd/next';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

export default class NewDialog extends Component {
  static displayName = 'NewDialog';
  
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
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      const { dataIndex } = this.state;
      this.props.NewModel( values.childNode);  
      this.setState({
        visible: false,
      });
    });
    <Link to='/DataStorage'></Link>
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
          新建
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}  //通过在这儿的设置，实现了是否使得视图可见
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="新建"
        >
          <FormItem label="模型名称：" {...formItemLayout}>
              <Input
                {...init('childNode', {
                  rules: [{ message: '必填选项' }],
                })}
              />
            </FormItem>

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
