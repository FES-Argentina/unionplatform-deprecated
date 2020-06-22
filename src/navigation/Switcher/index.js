import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './AuthLoadingScreen';
import AuthenticatedNavigation from '../Authenticated';
import GuestNavigation from '../Guest';
import ChangePass from '../../components/ChangePass';

const Switcher = createSwitchNavigator({
  Loading: {
    screen: AuthLoadingScreen,
    path: 'user/reset/:uid/:timestamp/:token/login',
  },
  Authenticated: {
    screen: AuthenticatedNavigation,
  },
  Guest: {
    screen: GuestNavigation,
  },
  ChangePass: {
    screen: ChangePass,
  }
});

export default createAppContainer(Switcher);
