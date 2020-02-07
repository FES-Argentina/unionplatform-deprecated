import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import NavigationService from '../../navigation/NavigationService';

import styles from '../styles';

class Generic extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.containerFlex}>
        <Text>{title}</Text>
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
