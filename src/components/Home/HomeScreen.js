import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.containerFlex}>
        <Text>Pantalla CHAT</Text>
      </View>
    );
  }
}
