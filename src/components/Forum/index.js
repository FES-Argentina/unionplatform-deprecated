import React from 'react';
import { BackHandler } from 'react-native';
import 'react-native-get-random-values';
import { WebView } from 'react-native-webview';
import Url from 'url-parse';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Forum extends React.Component {
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
    const uri = new Url(`${Config.API_URL}/discourse_autologin`);

    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri: uri.toString() }}
        incognito
        cacheEnabled={false}
        onMessage={this.handleMessage}
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
