import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles';

import { updateUserAction } from '../../actions/user';


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label('Alias')
    .required(),
  company: yup
    .string()
    .label('Empresa')
    .required(),
  email: yup
    .string()
    .label('E-mail personal')
    .email(),
  workemail: yup
    .string()
    .label('E-mail del trabajo')
    .email(),
});

class ProfileEdit extends React.Component {
  onSubmit = (values) => {
    const { id } = values;

    const { onUpdateUserAction } = this.props;
    onUpdateUserAction(id, values);
  }

  render() {
    // FIX: user id value
    return (
      <Formik
        initialValues={{
          company: '', workemail: '', email: '', username: '', id: 'efd',
        }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ name: '' }}
      >
        {({
          values, handleChange, isValid,
        }) => (
          <View style={styles.homeScreenEditProfile}>
            <Input
              label="Alias"
              mode="outlined"
              value={values.username}
              onChangeText={handleChange('username')}
              placeholder="Alias"
              leftIcon={(
                <Icon
                  name="user"
                  size={12}
                  color="grey"
                />
              )}
            />
            <Input
              label="Empresa"
              mode="outlined"
              value={values.company}
              onChangeText={handleChange('company')}
              placeholder="Empresa"
              leftIcon={(
                <Icon
                  name="building"
                  size={12}
                  color="grey"
                />
              )}
            />
            <Input
              label="Email personal"
              mode="outlined"
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="Email"
              leftIcon={(
                <Icon
                  name="envelope"
                  size={12}
                  color="grey"
                />
              )}
            />
            <Input
              label="Email del trabajo"
              mode="outlined"
              value={values.workemail}
              onChangeText={handleChange('workemail')}
              placeholder="Email"
              leftIcon={(
                <Icon
                  name="envelope"
                  size={12}
                  color="grey"
                />
              )}
            />
            <Button
              title="Guardar"
              type="outline"
              disabled={!isValid}
              onPress={() => this.onSubmit(values)}
            />
          </View>
        )}
      </Formik>
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
