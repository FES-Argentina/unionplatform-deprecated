import React from 'react';
import {
  ScrollView, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { loginRequest } from '../../actions/user';
import { clearErrors } from '../../actions';
import styles from '../styles';

import Message from '../Message';

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

  handleCloseMessage = () => {
    const { dispatch } = this.props;
    dispatch(clearErrors());
  }

  render() {
    const { error } = this.props;
    const show = error.message ? true : false;

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
          <ScrollView>
            <Text style={styles.presentation}>Sindicato APP</Text>
            <Input
              label="E-mail"
              mode="outlined"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="E-mail"
              labelStyle={styles.inputslabel}
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
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="key"
                  size={12}
                  color="grey"
                />
              )}
            />
            <Button
              title="Enviar"
              type="outline"
              disabled={!isValid}
              onPress={handleSubmit}
              buttonStyle={styles.submitButton}
            />
            <Message
              title="Error"
              message={error.message}
              show={show}
              handleClose={this.handleCloseMessage}
            />
        </ScrollView>
        )}
      </Formik>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
};

Login.defaultProps = {
  error: {
    message: null,
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps)(Login);
