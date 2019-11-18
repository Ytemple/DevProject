// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

// ICON 配置： https://ice.alibaba-inc.com/component/foundationsymbol
const asideMenuConfig = [
  {
    name: '数据存储管理',
    path: '/DataStorage',
    icon: 'home2',
  },
  {
    name: '数据处理流程',
    path: '/List',
    icon: 'cascades',
  },
  {
    name: '数据挖掘',
    path: '/DataMining',
    icon: 'person',
    children: [
      { name: '数据预处理', path: '/Preprocessing' },
      { name: '特征提取', path: '/FeatureExtraction' },
      { name: '特征筛选', path: '/FeatureScreening' },
      { name: '时频图像转换', path: 'TableTimeFrequency' },
    ],
  },
  {
    name: '智能模型训练与校验',
    path: '/4',
    icon: 'directory',
    children: [
      { name: '标签管理', path: '/TagManagement' },
      { name: '数据集构建', path: '/application/5' },
      { name: '模型训练', path: '/application/6' },
      { name: '模型校验', path: '/application/7' },
    ],
  },
  {
    name: '模型应用',
    path: '/12',
    icon: 'directory',
    children: [
      { name: '异常感知', path: '/application/8' },
      { name: '故障诊断', path: '/application/9' },
      { name: '寿命预测', path: '/application/10' },
    ],
  },
 
];

export { headerMenuConfig, asideMenuConfig };
