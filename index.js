import { AppRegistry, Loading } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import { name as appName } from './app.json';

import { store, persistor } from './src/store';
import LoadingOverlay from './src/components/LoadingOverlay';

const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <LoadingOverlay />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);
