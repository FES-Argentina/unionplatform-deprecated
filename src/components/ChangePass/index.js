import React from 'react';
import { connect } from 'react-redux';
import PasswordForm from '../PasswordForm';
import { changeUserPass, resetUserPass } from '../../actions/user';

class ChangePass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: undefined,
        token: undefined,
        cookie: undefined,
        authToken: undefined,
      },
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params) {
      const { id, token, cookie, authToken } = params;
      this.setState({
        user: { id, token, cookie, authToken }
      });
    }
  }

  onSubmit = (values) => {
    const { resetPass, changeUserPass } = this.props;
    const { user } = this.state;
    if (user.token) {
      resetPass(values.password, user)
    } else {
      changePass(values.currentPassword, values.password);
    }
  }

  render() {
    const { user } = this.state;
    return (
      <PasswordForm onSubmit={this.onSubmit} askCurrentPassword={!user.token} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetPass: (password, credentials) => dispatch(resetUserPass(password, credentials)),
  changePass: (password, credentials) => dispatch(changeUserPass(password, credentials)),
});

export default connect(null, mapDispatchToProps)(ChangePass);
