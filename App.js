import React from 'react';
import NavigationService from './src/navigation/NavigationService';
import Switcher from './src/navigation/Switcher';
import SplashScreen from 'react-native-splash-screen'

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Switcher ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      />
    );
  }
}

export default App;
