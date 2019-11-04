import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  createAppContainer,
} from 'react-navigation';
import {
  createDrawerNavigator,
} from 'react-navigation-drawer';
import {
  createStackNavigator,
} from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import styles from './styles';

import Home from '../../components/home/Home';
import Generic from '../../components/generic/Generic';
import DocumentList from '../../components/itemList/DocumentList';
import Notifications from '../../components/notifications/Notifications';
import Profile from '../../components/profile/Profile';
import Slideshow from '../../components/slideshow/Slideshow';

const Docs = ({ navigation }) => (<DocumentList navigation={navigation} />);
const NotificationsList = ({ navigation }) => (<Notifications navigation={navigation} />);
const User = () => (<Profile />);

class NavigationDrawerStructure extends React.Component {
  render() {
    const { navigationProps } = this.props;
    return (
      <SafeAreaView
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={[styles.viewFlexRow]}>
          <TouchableOpacity onPress={navigationProps.toggleDrawer}>
            <FontAwesome5 name="bars" style={[styles.bars]} size={22} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const TabStackNavigator = createStackNavigator({
  TabFirst: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Sindicato App',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
  TabSecond: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Sindicato App',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
  TabThird: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Sindicato App',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const ProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: User,
    navigationOptions: ({ navigation }) => ({
      title: 'Perfil',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const ComplaintsStackNavigator = createStackNavigator({
  Complaints: {
    screen: Generic,
    navigationOptions: ({ navigation }) => ({
      title: 'Denuncias',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const DocumentListStackNavigator = createStackNavigator({
  DocumentList: {
    screen: Docs,
    navigationOptions: ({ navigation }) => ({
      title: 'Documentos',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const NotificationsStackNavigator = createStackNavigator({
  Notifications: {
    screen: NotificationsList,
    navigationOptions: ({ navigation }) => ({
      title: 'Notificaciones',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const SlideshowStackNavigator = createStackNavigator({
  Slideshow: {
    screen: Slideshow,
    navigationOptions: ({ navigation }) => ({
      title: 'Slideshow',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const DrawerNavigator = createDrawerNavigator({
  Screen1: {
    screen: TabStackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: () => (
        <FontAwesome5 name="home" size={15} />
      ),
    },
  },

  Screen2: {
    screen: ProfileStackNavigator,
    navigationOptions: {
      drawerLabel: 'Perfil',
      drawerIcon: () => (
        <FontAwesome5 name="user-ninja" solid size={15} />
      ),
    },
  },

  Screen3: {
    screen: ComplaintsStackNavigator,
    navigationOptions: {
      drawerLabel: 'Denuncias',
      drawerIcon: () => (
        <FontAwesome5 name="burn" solid size={15} />
      ),
    },
  },

  Screen4: {
    screen: DocumentListStackNavigator,
    navigationOptions: {
      drawerLabel: 'Documentos',
      drawerIcon: () => (
        <FontAwesome5 name="file" solid size={15} />
      ),
    },
  },

  Screen5: {
    screen: NotificationsStackNavigator,
    navigationOptions: {
      drawerLabel: 'Notificaciones',
      drawerIcon: () => (
        <FontAwesome5 name="bell" solid size={15} />
      ),
    },
  },

  Screen6: {
    screen: SlideshowStackNavigator,
    navigationOptions: {
      drawerLabel: 'Slideshow',
      drawerIcon: () => (
        <FontAwesome5 name="meteor" solid size={15} />
      ),
    },
  },


});

NavigationDrawerStructure.propTypes = {
  navigationProps: PropTypes.object.isRequired,
};

Docs.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

NotificationsList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const nav = createAppContainer(DrawerNavigator);

export default nav;
