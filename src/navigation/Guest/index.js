import React from 'react';
import { Button } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../components/Login';
import ResetPass from '../../components/ResetPass';
import Slideshow from '../../components/Slideshow';
import Generic from '../../components/Generic';
import Onboarding from '../../components/Onboarding';
import Enrollment from '../../components/Enrollment';
import NewsDetail from '../../components/NewsDetail';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';


const JoinPlaceholder = () => (<Generic title="Afiliate" />);

const GuestStackNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Slideshow,
      navigationOptions: {
        title: 'Bienvenidx',
      },
    },
    NewsDetailGuest: {
      screen: NewsDetail,
      navigationOptions: {
        title: 'Noticia',
      },
    },
    Join: {
      screen: Enrollment,
      navigationOptions: {
        title: 'Afiliate',
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Login',
      },
    },
    ResetPass: {
      screen: ResetPass,
      navigationOptions: {
        title: 'Nueva pass',
      },
    },
    Help: {
      screen: Onboarding,
      navigationOptions: {
        title: 'Ayuda',
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <>
          { navigation.state.routeName !== 'Join' && (
          <Button
            title="Afiliate"
            onPress={() => { navigation.navigate('Join'); }}
            type="clear"
            titleStyle={{ color: 'white' }}
          />
          )}
          { navigation.state.routeName !== 'Login' && (
          <Button
            title="Login"
            onPress={() => { navigation.navigate('Login'); }}
            type="clear"
            titleStyle={{ color: 'white' }}
          />
          )}
          <FontAwesome5 name="question" size={15} style={[styles.question]}
            onPress={() => { navigation.navigate('Help'); }}
            type="clear"
          />
        </>
      ),
    }),
  },
);

export default createAppContainer(GuestStackNavigator);
