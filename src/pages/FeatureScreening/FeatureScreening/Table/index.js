import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
//import UploadFile from '../Table2/UploadFile';
import TableScreening from './TableScreening/index'

const TabPane = Tab.Item;

export default class Table extends Component {
  static displayName = 'Table';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const tabs = [
      { tab: '特征筛选', key: '1', content: <TableScreening /> },
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
