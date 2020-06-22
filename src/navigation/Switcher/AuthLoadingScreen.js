import React from 'react';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import LoadingIndicator from '../../components/LoadingIndicator';
import { loginStatus, oneTimeLogin } from '../../api';
import NavigationService from '../NavigationService';

const ROUTES = {
  Authenticated: [],
  Guest: ['Login'],
};

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    const { params } = this.props.navigation.state;
    this._bootstrapAsync(params);
  }

  _bootstrapAsync = ({ uid, token, timestamp } = {}) => {
    this._checkStatus().then((status) => {
      // If we have an open session we can't show the password reset form.
      if (status && token) {
        this._redirect('Authenticated', 'Ya estás identificadx en la aplicación, cerrá sesión para poder usar el enlace de nueva contraseña.');
      }
      else if (!status && token) {
        oneTimeLogin(uid, token, timestamp)
          .then(this._redirectToPasswordForm)
          .catch((error) => this._redirect('Guest', 'El enlace de login usado no es válido.'));
      }
      else {
        this._redirect(status ? 'Authenticated' : 'Guest');
      }
    });
  }

  _redirectToPasswordForm = (response) => {
    const { user: id, pass_reset_token: token, csrf_token: authToken } = response.data;
    const cookie = response.cookie[0];
    const params = { id, token, cookie, authToken };
    NavigationService.navigate('ChangePass', params);
  }

  _redirect = (routeName, message) => {
    if (message) {
      Toast.show(message, Toast.LONG);
    }
    NavigationService.navigate(this._getNextRouteName(routeName));
  }

  _getNextRouteName = (current) => {
    const { params } = this.props.navigation.state;
    if (params && params.routeName) {
      const nextRoute = ROUTES[current].find(i => i === params.routeName);
      if (nextRoute) {
        return nextRoute;
      }
    }

    return current;
  }

  _checkStatus = () => {
    const { user } = this.props;
    var status = false;

    if (user.cookie) {
      try {
        return new Promise((resolve, reject) => {
          loginStatus().then((status) => resolve(status));
        });
      }
      catch (e) {
        return Promise.resolve(false);
      }
    }

    return Promise.resolve(false);
  }

  render() {
    return (
      <LoadingIndicator />
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AuthLoadingScreen);
