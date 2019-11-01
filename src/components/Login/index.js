import React from 'react';
import {
  Button,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { loginRequest } from '../../actions/user';

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
        {({ values, handleChange, handleBlur, handleSubmit, isValid }) => (
          <View>
            <TextInput
              label="E-mail"
              mode="outlined"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="E-mail"
            />
            <TextInput
              label="Contraseña"
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Contraseña"
              secureTextEntry
            />
            <Button
              title="Ingresar"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Login);
