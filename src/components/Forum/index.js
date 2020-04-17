import React from 'react';
import { BackHandler } from 'react-native';
import 'react-native-get-random-values';
import { WebView } from 'react-native-webview';
import Url from 'url-parse';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Forum extends React.Component {
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
    const uri = new Url(Config.FORUM_URL);
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri: uri.toString() }}
        incognito
        cacheEnabled={false}
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
