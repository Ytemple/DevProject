import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import Vibration from './Vibration/Vibration'
import Sequence from './Sequence/Sequence'
import Image from './Image/Image'

const TabPane = Tab.Item;

export default class TagManagement extends Component {
  static displayName = 'TagManagement';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const tabs = [
      { tab: '振动数据', key: '1', content: <Vibration /> },
      { tab: '时序数据', key: '2', content: <Sequence /> },
      { tab: '图像数据', key: '3', content: <Image /> },
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
