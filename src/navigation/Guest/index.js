import React from 'react';
import { Button } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../components/Login';
import Slideshow from '../../components/Slideshow';
import Generic from '../../components/Generic';


const JoinPlaceholder = () => (<Generic title="Afiliate" />);

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
          { navigation.state.routeName !== 'Join' && (
          <Button
            title="Afiliate"
            onPress={() => { navigation.navigate('Join'); }}
            type="clear"
            titleStyle={{ color: 'white' }}
          />
          )}
          { navigation.state.routeName !== 'Login' && (
          <Button
            title="Login"
            onPress={() => { navigation.navigate('Login'); }}
            type="clear"
            titleStyle={{ color: 'white' }}
          />
          )}
        </>
      ),
    }),
  },
);

export default createAppContainer(GuestStackNavigator);
