import { AppRegistry, Loading } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';
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

messaging().setBackgroundMessageHandler(async (message) => {
  Notifications.postLocalNotification({
    title: message.data.title,
    body: message.data.body,
  });
});

AppRegistry.registerComponent(appName, () => AppWrapper);
