import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import OnboardingScreen from 'react-native-onboarding-swiper';
import NavigationService from '../../navigation/NavigationService';

import styles from '../styles';

class Onboarding extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <OnboardingScreen
        onSkip={() => NavigationService.navigate('Loading')}
        onDone={() => NavigationService.navigate('Loading')}
        pages={[
          {
            backgroundColor: 'mintcream',
            image: <Image source={require('../../assets/images/folder.png')} style={styles.itemPhotoOnboarding}/>,
            title: 'Cargá y compartí tus denuncias',
            subtitle: 'Guardalas como PDFs certificados con BFA',
          },
          {
            backgroundColor: 'linen',
            image: <Image source={require('../../assets/images/padlock.png')} style={styles.itemPhotoOnboarding}/>,
            title: 'Protegé tus datos sensibles',
            subtitle: 'Garantizamos la seguridad de la información',
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
