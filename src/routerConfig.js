import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';

import UserLogin from '@/pages/UserLogin';
import UserRegister from '@/pages/UserRegister';

import NotFound from '@/pages/NotFound';
import DataStorage from '../src/pages/DataStorage/index';  //数据存储管理
import DataProcessing from '../src/pages/DataProcessing/DataProcessing'; //数据处理流程
import List from '../src/pages/DataProcessing/List/index'   //数据处理流程/列表界面
import DataMining from '../src/pages/DataMining/DataMining';
import Preprocessing from '../src/pages/Preprocessing/Preprocessing/index'//数据挖掘/数据预处理
import FeatureExtraction from '../src/pages/FeatureExtraction/FeatureExtraction/index' //数据挖掘/特征提取
import FeatureScreening from '../src/pages/FeatureScreening/FeatureScreening/FeatureScreening'  //数据挖掘/特征筛选
import TableTimeFrequency from '../src/pages/TimeFrequency/index'    //数据挖掘/时频图像转换
import TagManagement from '../src/pages/TagManagement/index'  //智能模型训练与校验/标签管理
import ModelTraining from '../src/pages/ModelTraining/index'  //智能模型训练与校验/模型训练
import ModelCheck from '../src/pages/ModelCheck/index'  //智能模型训练与校验/模型校验

import LifePrediction from '../src/pages/LifePrediction/index'  //智能模型训练与校验/模型校验

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: UserLogin,
      },
      {
        path: '/register',
        component: UserRegister,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/DataStorage',
        component: DataStorage,
      },
      {
        path: '/DataProcessing',
        component: DataProcessing,
      },
      {
        path: '/DataMining',
        component: DataMining,
      },
      {
        path: '/List',
        component: List,
      },
      {
        path: '/Preprocessing',
        component: Preprocessing,
      },
      {
        path: '/FeatureExtraction',
        component: FeatureExtraction,
      },
      {
        path: '/FeatureScreening',
        component: FeatureScreening,
      },
      {
        path: '/TableTimeFrequency',
        component: TableTimeFrequency,
      },
      {
        path: '/TagManagement',
        component: TagManagement,
      },

      {
        path: '/ModelTraining',
        component: ModelTraining,
      },
      {
        path: '/ModelCheck',
        component: ModelCheck,
      },

      {
        path: '/LifePrediction',
        component: LifePrediction,
      },

      {
        path: '/',
        redirect: DataStorage,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
