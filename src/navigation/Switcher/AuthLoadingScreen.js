import React from 'react';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';
import { loginStatus } from '../../api';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const { user, navigation } = this.props;
    var status = false;
    if (user.cookie) {
      status = await loginStatus();
    }
    navigation.navigate(status ? 'Authenticated' : 'Guest');
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
