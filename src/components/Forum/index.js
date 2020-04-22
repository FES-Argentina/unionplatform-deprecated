import React from 'react';
import { BackHandler, Linking } from 'react-native';
import 'react-native-get-random-values';
import { WebView } from 'react-native-webview';
import Url from 'url-parse';
import Toast from 'react-native-simple-toast';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.forumUrl = new Url(Config.FORUM_URL);
    this.authUrl = new Url(`${Config.API_URL}/discourse_autologin`);
  }

  _requestAllowed = (url) => {
    // Allow internal URLs.
    if (url.hostname == this.forumUrl.hostname) {
      return true;
    }

    // Allow only the API URLs we need to authenticate the user.
    if (url.hostname == this.authUrl.hostname) {
      return url.pathname == "/discourse_autologin"
        || url.pathname == "/discourse_sso";
    }

    return false;
  }

  handleMessage = (event) => {
    const { data } = event.nativeEvent;
    const { user } = this.props;

    if (data === 'GET_CREDENTIALS') {
      const response = {
        cookie: user.cookie ? `${user.cookie.name}=${user.cookie.value}` : null,
      };
      const responseCode = `
        window.postMessage(${JSON.stringify(response)}, "*");
        true;
      `;

      if (this.webview) {
        this.webview.injectJavaScript(responseCode);
      }
    }
  }

  handleLoadRequest = (event) => {
    const { url } = event;
    if (url && this._requestAllowed(new Url(url))) {
      return true;
    }

    Linking.openURL(url).catch((err) => Toast.show('No se pudo abrir el enlace.', Toast.LONG));

    return false;
  }

  handleBackButton = () => {
    // FIXME: We should track the webview canGoBack state but 
    // onNavigationStateChange is not being called.
    // https://github.com/react-native-community/react-native-webview/issues/291
    this.webview.goBack();
    return true;
  }

  handleFocus = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBlur = () => {
    this.backHandler.remove();
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusSubscription = navigation.addListener('willFocus', this.handleFocus);
    this.blurSubscription = navigation.addListener('willBlur', this.handleBlur);
  }

  componentWillUnmount() {
    this.focusSubscription.remove();
    this.blurSubscription.remove();
  }

  render() {
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri: this.authUrl.toString() }}
        incognito
        cacheEnabled={false}
        onMessage={this.handleMessage}
        onShouldStartLoadWithRequest={this.handleLoadRequest}
      />
    );
  }
}

Forum.propTypes = {
  user: PropTypes.objectOf(PropTypes.object),
};

Forum.defaultProps = {
  user: {
    cookie: null,
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Forum);
