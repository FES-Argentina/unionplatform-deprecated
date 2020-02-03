import React from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUserAction } from '../../actions/user';
import ProfileForm from '../ProfileForm';

class ProfileEdit extends React.Component {
  onSubmit = (values) => {
    const { onUpdateUserAction, user } = this.props;
    onUpdateUserAction(user.id, values);
  }


  render() {
    const { profile } = this.props.user;
    return (
      <ProfileForm profile={profile} onSubmit={this.onSubmit} />
    );
  }
}

ProfileEdit.propTypes = {
  onUpdateUserAction: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onUpdateUserAction: (id, newValues) => {
    dispatch(updateUserAction(id, newValues));
  },
});


const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
