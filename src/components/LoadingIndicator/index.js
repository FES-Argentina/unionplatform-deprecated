import React from 'react';
import { StatusBar, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BarIndicator } from 'react-native-indicators';
import styles from '../styles';

class LoadingIndicator extends React.Component {
  render() {
    return (
      <View style={styles.containerFlex}>
        <BarIndicator color="#f50057" count={5} />
      </View>
    );
  }
}

export default LoadingIndicator;
