import React from 'react';
import NavigationService from './src/navigation/navigationService';
import Switcher from './src/navigation/loading/Switcher';

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
