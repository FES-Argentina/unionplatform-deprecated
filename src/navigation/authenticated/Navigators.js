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
import DocumentList from '../../components/DocumentList';

const Doc = () => (<DocumentList title="Docs" />);

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
  First: {
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
  Second: {
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
  Third: {
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
  First: {
    screen: Generic,
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
  First: {
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
  First: {
    screen: Doc,
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


});

NavigationDrawerStructure.propTypes = {
  navigationProps: PropTypes.object.isRequired,
};


const nav = createAppContainer(DrawerNavigator);

export default nav;
