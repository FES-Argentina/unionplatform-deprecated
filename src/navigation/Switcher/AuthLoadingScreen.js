import React from 'react';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import LoadingIndicator from '../../components/LoadingIndicator';
import { loginStatus, oneTimeLogin } from '../../api';
import NavigationService from '../NavigationService';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    const { params } = this.props.navigation.state;
    this._bootstrapAsync(params);
  }

  _bootstrapAsync = ({ uid, token, timestamp } = {}) => {
    const { user, navigation } = this.props;

    if (uid && token && timestamp) {
      // TODO: What if we have a session for a different user?
      oneTimeLogin(uid, token, timestamp)
        .then((response) => {
          const { user: id, pass_reset_token: token, csrf_token: authToken } = response.data;
          const cookie = response.cookie[0];
          const params = { id, token, cookie, authToken };

          NavigationService.navigate('ResetPass', params);
        })
        .catch((error) => {
          Toast.show('El enlace de login usado no es válido.', Toast.LONG);
          this._redirect();
        });
    }
    else {
      this._redirect();
    }
  }

  _redirect = () => {
    this._checkStatus()
      .then((status) => {
        NavigationService.navigate(status ? 'Authenticated' : 'Guest');
      })
      .catch((err) => {
        NavigationService.navigate('Guest');
      });
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
