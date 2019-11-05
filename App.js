import React from 'react';
import NavigationService from './src/navigation/navigationService';
import Nav from './src/navigation/authenticated/Navigators';

class App extends React.Component {
  render() {
    return (
      <Nav ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      />
    );
  }
}

export default App;
