import React from 'react';
import {
  createAppContainer,
} from 'react-navigation';
import {
  createStackNavigator,
} from 'react-navigation-stack';
import {
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';

// Import all the screens for Tab
import HomeScreen from './HomeScreen';
import CardList from '../CardList';
import NewsDetail from '../NewsDetail';
import Alerts from '../Alerts';
import Forum from '../Forum';

const ListStackNavigator = createStackNavigator({
  CardList: {
    screen: CardList,
    navigationOptions: {
      header: null,
    },
  },
  NewsDetail: {
    screen: NewsDetail,
    navigationOptions: {
      header: null,
    },
  },
});

const TabScreen = createMaterialTopTabNavigator(
  {
    Noticias: { screen: ListStackNavigator },
    Mapa: { screen: Alerts },
    Forum: { screen: Forum },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#f50057',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#ff5983',
        borderBottomWidth: 2,
      },
    },
  },
);
const TabHelper = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      header: null,
    },
  },
});
export default createAppContainer(TabHelper);
