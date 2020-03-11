import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../styles';


class TermsAndConditions extends React.PureComponent {
  render() {
    return (
      <WebView
        source={{uri: 'file:///android_asset/terms-and-conditions.html'}}
        scalesPageToFit={false}
      />
    )
  }
}

export default TermsAndConditions;
