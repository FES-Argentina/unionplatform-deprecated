import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingScreen from './AuthLoadingScreen';
import Nav from '../authenticated/Navigators';
import GuestStackNavigator from '../guest/Navigation';

const Switcher = createSwitchNavigator({
  Loading: {
    screen: AuthLoadingScreen,
  },
  Authenticated: {
    screen: Nav,
  },
  Guest: {
    screen: GuestStackNavigator,
  }
});

export default createAppContainer(Switcher);
