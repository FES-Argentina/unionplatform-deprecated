import React from 'react';
import NavigationService from './src/navigation/NavigationService';
import Switcher from './src/navigation/Switcher';

class App extends React.Component {
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
