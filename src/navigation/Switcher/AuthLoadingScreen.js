import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const { authenticatedScreen, guestScreen, user, navigation } = this.props;
    navigation.navigate(user.authToken ? 'Authenticated' : 'Guest');
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <Text h3>Cargando...</Text>
        <StatusBar style='default' />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AuthLoadingScreen);
