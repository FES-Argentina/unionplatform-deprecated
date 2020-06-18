import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './AuthLoadingScreen';
import AuthenticatedNavigation from '../Authenticated';
import GuestNavigation from '../Guest';
import ChangePass from '../../components/ChangePass';

const Switcher = createSwitchNavigator({
  Loading: {
    screen: AuthLoadingScreen,
  },
  Authenticated: {
    screen: AuthenticatedNavigation,
  },
  Guest: {
    screen: GuestNavigation,
  },
  ResetPass: {
    screen: ChangePass,
  }
});

export default createAppContainer(Switcher);
