import React from 'react';
import { StatusBar, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BarIndicator } from 'react-native-indicators';

class LoadingIndicator extends React.Component {
  render() {
    return (
      <View style={style}>
        <BarIndicator color="#f50057" count={5} />
      </View>
    );
  }
}

const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

export default LoadingIndicator;
