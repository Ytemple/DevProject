import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
//import UploadFile from '../Table2/UploadFile';
import TableVibrationModelTraining from './Table/index'

const TabPane = Tab.Item;

export default class TableVibrationModelTraining extends Component {
  static displayName = 'TableVibrationModelTraining';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const tabs = [
      { tab: '时频图像转换', key: '1', content: <TableVibrationModelTraining /> },
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
