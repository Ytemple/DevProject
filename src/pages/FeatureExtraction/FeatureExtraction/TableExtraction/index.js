import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
//import UploadFile from '../Table2/UploadFile';
import TimeDomain from './TimeDomain/index'
import FrequencyDomain from './FrequencyDomain/index'
import TimeFrequencyDomain from './TimeFrequencyDomain/index'
import Timing from './Timing/index'


const TabPane = Tab.Item;



export default class TableExtraction extends Component {
  static displayName = 'TableExtraction';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const tabs = [
      { tab: '时域特征提取', key: '1', content: <TimeDomain /> },
      { tab: '频域特征提取', key: '2', content: <FrequencyDomain /> },
      { tab: '时频域特征提取', key: '3', content: <TimeFrequencyDomain /> },
      { tab: '时序特征提取', key: '4', content: <Timing /> },

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
