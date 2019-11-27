import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Onboarding from 'react-native-onboarding-swiper';
import NavigationService from '../../navigation/NavigationService';

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
