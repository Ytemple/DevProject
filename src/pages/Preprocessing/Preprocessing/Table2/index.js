import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
//import UploadFile from '../Table2/UploadFile';
import Table from '../Table2/TabTable/Table'

const TabPane = Tab.Item;



export default class Table2 extends Component {
  static displayName = 'Table2';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const tabs = [
      { tab: '数据预处理', key: '1', content: <Table /> },

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
