import React from 'react';
import { WebView } from 'react-native-webview';
import Url from 'url-parse';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Chat extends React.Component {
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

  render() {
    const uri = new Url(Config.CHAT_URL);
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

Chat.propTypes = {
  user: PropTypes.objectOf(PropTypes.object),
};

Chat.defaultProps = {
  user: {
    cookie: null,
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Chat);
