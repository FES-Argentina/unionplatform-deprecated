import React from 'react';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutRequest } from '../../actions/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from '../styles';


class LogoutButton extends React.Component {
  signOut = () => {
    const { dispatch } = this.props;
    dispatch(logoutRequest());
  }

  render() {
    return (
      <Button
        titleStyle={styles.logout}
        buttonStyle={styles.logoutContainer}
        type="clear"
        title="Salir"
        icon= {<FontAwesome5 name="sign-out-alt" style={styles.logoutIcon} />}
        onPress={this.signOut}
      />
    );
  }
}

export default connect()(LogoutButton);
