import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import styles from '../styles';

class Field extends React.Component {
  render() {
    const { label, value, icon } = this.props;

    return (
      <View>
        <View style={styles.fieldLabel}>
          {icon ? (<FontAwesome5 name={icon} solid size={15} style={styles.fieldIcon} />) : null }
          <Text style={styles.titlesDetail}>{label}</Text>
        </View>
        <Text style={styles.bodyDetail}>
          {value ? value : '-'}
        </Text>
      </View>
    );
  }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default Field;
