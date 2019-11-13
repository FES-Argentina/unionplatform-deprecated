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
      <Onboarding
        onSkip={() => NavigationService.navigate('Welcome')}
        onDone={() => NavigationService.navigate('Welcome')}
        pages={[
          {
            backgroundColor: 'yellow',
            image: <Image source={require('../../assets/images/menu.png')} style={styles.itemPhoto}/>,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: 'orange',
            image: <Image source={require('../../assets/images/menu.png')} style={styles.itemPhoto}/>,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
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
