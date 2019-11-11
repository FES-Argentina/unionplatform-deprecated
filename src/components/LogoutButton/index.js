import React from 'react';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutRequest } from '../../actions/user';

const theme = {
  colors: {
    primary: 'black'
  }
}

class LogoutButton extends React.Component {
  signOut = () => {
    const { dispatch } = this.props;
    dispatch(logoutRequest());
  }

  render() {
    return (
      <Button
        theme={theme}
        type="outline"
        title="Logout"
        onPress={this.signOut}
      />
    );
  }
}

export default connect()(LogoutButton);
