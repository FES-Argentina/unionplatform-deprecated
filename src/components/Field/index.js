import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';

class Field extends React.Component {
  render() {
    const { label, value } = this.props;

    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Field;
