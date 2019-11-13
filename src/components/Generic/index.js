import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class Generic extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
}

Generic.propTypes = {
  title: PropTypes.string,
};

Generic.defaultProps = {
  title: 'Generic',
};

export default Generic;
