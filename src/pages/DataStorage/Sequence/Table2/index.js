import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import UploadFile from '../Table2/UploadFile';
import Table from '../Table2/TabTable/Table'

const TabPane = Tab.Item;



export default class Table2 extends Component {
  static displayName = 'Table2';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    console.log('17:38',this.props)
    this.state = {
    };
  }

  render() {
    const tabs = [
      { tab: '数据展示', key: '1', content: <Table pid={this.props.pid} /> },
      { tab: '数据上传', key: '2', content: <UploadFile pid={this.props.pid} /> },
    ];

    return (
      <IceContainer >
        
        <Tab style={styles.title}>
          {tabs.map((item) => {
            return (
              <TabPane key={item.key} title={item.tab} >
                {item.content}
              </TabPane>
            );
          })}
        </Tab>
      </IceContainer>
    );
  }
}

const styles = {
  title: {
    marginTop: '-13px',
  },
};
