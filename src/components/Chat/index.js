import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

class Chat extends Component {
  render() {
    return (
      <WebView source={{ uri: 'https://tlk.io/AppSindical' }} />
    );
  }
}

export default Chat;
