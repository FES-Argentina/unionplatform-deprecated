import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './AuthLoadingScreen';
import Nav from '../authenticated/Navigators';
import Login from '../../components/login/Login';

const Switcher = createSwitchNavigator({
  Loading: {
    screen: AuthLoadingScreen,
  },
  Authenticated: {
    screen: Nav,
  },
  Guest: {
    screen: Login,
  }
});

export default createAppContainer(Switcher);
