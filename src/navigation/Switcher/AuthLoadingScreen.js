import React from 'react';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const { user, navigation } = this.props;
    navigation.navigate(user.authToken ? 'Authenticated' : 'Guest');
  }

  render() {
    return (
      <LoadingIndicator />
    )
  }
}

const style = {
  flex: 1,
  justifyContent: 'space-around',
  alignItems: 'center',
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AuthLoadingScreen);
