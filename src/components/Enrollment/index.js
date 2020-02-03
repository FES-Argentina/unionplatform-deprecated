import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEnrollment } from '../../actions/user';
import ProfileForm from '../ProfileForm';


class Enrollment extends React.Component {
  onSubmit = (values) => {
    const { saveEnrollment } = this.props;
    saveEnrollment(values);
  }

  render() {
    return (
      <ProfileForm onSubmit={this.onSubmit} />
    );
  }
}

Enrollment.propTypes = {
  saveEnrollment: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  saveEnrollment: (values) => {
    dispatch(setEnrollment(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Enrollment);
