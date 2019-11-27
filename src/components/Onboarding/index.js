import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import OnboardingScreen from 'react-native-onboarding-swiper';
import NavigationService from '../../navigation/NavigationService';

import styles from './styles';

class Onboarding extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <OnboardingScreen
        onSkip={() => NavigationService.navigate('Loading')}
        onDone={() => NavigationService.navigate('Loading')}
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

Onboarding.propTypes = {
  title: PropTypes.string,
};

Onboarding.defaultProps = {
  title: 'Ayuda',
};

export default Onboarding;
