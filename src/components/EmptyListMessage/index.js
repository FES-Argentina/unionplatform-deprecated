import React from 'react';
import { Text } from 'react-native-elements';
import styles from '../styles';

export default EmptyListMessage = (props) => (
  <Text style={styles.emptyListMessage}>{props.text}</Text>
)
