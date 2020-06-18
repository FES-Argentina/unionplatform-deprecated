import React from 'react';
import NavigationService from './src/navigation/NavigationService';
import Switcher from './src/navigation/Switcher';
import SplashScreen from 'react-native-splash-screen'
import Config from 'react-native-config';

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Switcher
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        uriPrefix={`${Config.API_URL}/`}
      />
    );
  }
}

export default App;
