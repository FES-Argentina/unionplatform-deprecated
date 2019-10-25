import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './styles';

class Generic extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <Text style={[styles.text]}>Generic</Text>
      </View>
    );
  }
}

export default Generic;
