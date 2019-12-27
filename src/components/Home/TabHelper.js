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
import Alerts from '../Alerts';
import Chat from '../Chat';


const TabScreen = createMaterialTopTabNavigator(
  {
    Noticias: { screen: CardList },
    Mapa: { screen: Alerts },
    Chat: { screen: Chat },
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
