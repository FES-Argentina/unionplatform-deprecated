import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingScreen from './AuthLoadingScreen';
import AuthenticatedNavigation from '../Authenticated';
import GuestNavigation from '../Guest';

const Switcher = createSwitchNavigator({
  Loading: {
    screen: AuthLoadingScreen,
  },
  Authenticated: {
    screen: AuthenticatedNavigation,
  },
  Guest: {
    screen: GuestNavigation,
  }
});

export default createAppContainer(Switcher);
