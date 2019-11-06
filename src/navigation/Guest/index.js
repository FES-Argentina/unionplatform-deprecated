import React from 'react';
import { Fragment } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; 
import Login from '../../components/login/Login';
import Slideshow from '../../components/slideshow/Slideshow';
import Generic from '../../components/generic/Generic';

const JoinPlaceholder = () => (<Generic title='Afiliate' />)

const GuestStackNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Slideshow,
      navigationOptions: {
        title: 'Bienvenidx',
      },
    },
    Join: {
      screen: JoinPlaceholder,
      navigationOptions: {
        title: 'Afiliate',
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Login',
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <>
          <Button title='Afiliate' onPress={() => { navigation.navigate('Join') }} />
          <Button title='Login'  onPress={() => { navigation.navigate('Login') }} />
        </>
      ),
    }),
  }
);

export default createAppContainer(GuestStackNavigator);
