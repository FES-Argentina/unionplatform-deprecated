import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

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
      <View style={style}>
        <Text h4>Cargando...</Text>
        <ActivityIndicator size="large" color="#f50057"/>
      </View>
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
