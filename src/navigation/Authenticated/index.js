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
  DrawerItems,
} from 'react-navigation-drawer';
import {
  createStackNavigator,
} from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import styles from './styles';
import LogoutButton from '../../components/LogoutButton';

import Home from '../../components/Home';
import CardList from '../../components/CardList';
import NewsDetail from '../../components/NewsDetail';
import Complaint from '../../components/Complaint';

import SimpleList from '../../components/SimpleList';
import Profile from '../../components/Profile';


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
    screen: Profile,
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
    screen: Complaint,
    navigationOptions: ({ navigation }) => ({
      title: 'Cargar denuncia',
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

const ListStackNavigator = createStackNavigator({
  CardList: {
    screen: CardList,
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
  NewsDetail: {
    screen: NewsDetail,
    navigationOptions: ({ navigation }) => ({
      title: 'Documento',
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
  SimpleList: {
    screen: SimpleList,
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

const DrawerNavigator = createDrawerNavigator({
  Tabs: {
    screen: TabStackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: () => (
        <FontAwesome5 name="home" size={15} />
      ),
    },
  },

  Profile: {
    screen: ProfileStackNavigator,
    navigationOptions: {
      drawerLabel: 'Perfil',
      drawerIcon: () => (
        <FontAwesome5 name="user-ninja" solid size={15} />
      ),
    },
  },

  Complaints: {
    screen: ComplaintsStackNavigator,
    navigationOptions: {
      drawerLabel: 'Cargar denuncia',
      drawerIcon: () => (
        <FontAwesome5 name="burn" solid size={15} />
      ),
    },
  },

  CardList: {
    screen: ListStackNavigator,
    navigationOptions: {
      drawerLabel: 'Documentos',
      drawerIcon: () => (
        <FontAwesome5 name="file" solid size={15} />
      ),
    },
  },

},
{
  contentComponent: (props) => (
    <View style={styles.drawerContent}>
      <SafeAreaView forceInset={{ horizontal: 'never' }}>
        <DrawerItems {...props} />
        <LogoutButton />
      </SafeAreaView>
    </View>
  ),
});

NavigationDrawerStructure.propTypes = {
  navigationProps: PropTypes.object.isRequired,
};

CardList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SimpleList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const nav = createAppContainer(DrawerNavigator);

export default nav;
