import React from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { loginRequest } from '../../actions/user';
import styles from './styles';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('E-mail')
    .email()
    .required(),
  password: yup
    .string()
    .label('Contraseña')
    .required(),
});

class Login extends React.Component {
  onSubmit = (values) => {
    const { email, password } = values;
    const { dispatch } = this.props;
    dispatch(loginRequest(email, password));
  }

  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ email: '' }}
      >
        {({
          values, handleChange, handleBlur, handleSubmit, isValid,
        }) => (
          <View style={styles.homeScreen}>
            <Input
              label="E-mail"
              mode="outlined"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="E-mail"
              leftIcon={(
                <Icon
                  name="envelope"
                  size={12}
                  color="grey"
                />
              )}
            />
            <Input
              label="Contraseña"
              mode="outlined"
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Contraseña"
              secureTextEntry
              leftIcon={(
                <Icon
                  name="key"
                  size={12}
                  color="grey"
                />
              )}
            />
            <Button
              title="Ingresar"
              type="outline"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Login);
