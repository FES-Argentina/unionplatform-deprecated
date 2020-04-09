import React from 'react';
import { WebView } from 'react-native-webview';
import Url from 'url-parse';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Forum extends React.Component {
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
