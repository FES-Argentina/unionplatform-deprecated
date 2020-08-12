import React from 'react';
import {
  ScrollView, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { loginRequest } from '../../actions/user';
import { clearErrors } from '../../actions';
import NavigationService from '../../navigation/NavigationService';
import { displayName } from '../../../app.json';

import styles from '../styles';

import Message from '../Message';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .label('Usuarix')
    .min(3, 'El nombre de usuarix debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  password: yup
    .string()
    .label('Contraseña')
    .required('Campo requerido'),
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.fields = {};
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusSubscription = navigation.addListener('willFocus', this.clearErrors);
  }

  componentWillUnmount() {
    this.focusSubscription.remove();
  }

  clearErrors = () => {
    const { dispatch } = this.props;
    dispatch(clearErrors());
  }

  onSubmit = (values) => {
    const { name, password } = values;
    const { dispatch } = this.props;
    dispatch(loginRequest(name, password));
  }

  resetPass = () => {
    NavigationService.navigate('ResetPass');
  }

  enroll = () => {
    NavigationService.navigate('Join');
  }

  focusNextField = (key) => {
    this.fields[key].focus();
  }

  render() {
    const { error } = this.props;
    const show = error.message ? true : false;

    return (
      <Formik
        initialValues={{ name: '', password: '', id: 'frs' }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ name: '' }}
      >
        {({
          values, handleChange, isValid, setFieldValue, submitForm, errors, touched, handleBlur, handleSubmit
        }) => (
          <ScrollView>
            <Text style={styles.presentation}>{displayName}</Text>
            <Input
              label="Usuarix"
              mode="outlined"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Nombre de usuarix"
              labelStyle={styles.inputslabel}
              keyboardType="email-address"
              valid={touched.name && !errors.name}
              error={touched.name && errors.name}
              returnKeyType="next"
              autoCapitalize="none"
              leftIcon={(
                <Icon
                  name="envelope"
                  size={12}
                  color="grey"
                />
              )}
              ref={(input) => {
                this.fields.mail = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('password');
              }}
              blurOnSubmit={false}
            />
            {errors.name && touched.name ? (
                <Text style={styles.formErrorMessage}>{errors.name}</Text>
            ) : null }
            <Input
              label="Contraseña"
              mode="outlined"
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Contraseña"
              secureTextEntry
              autoCapitalize="none"
              valid={touched.password && !errors.password}
              error={touched.password && errors.password}
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="key"
                  size={12}
                  color="grey"
                />
              )}
              ref={(input) => {
                this.fields.password = input;
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                submitForm();
              }}
              returnKeyType="done"
            />
          {errors.password && touched.password ? (
                <Text style={styles.formErrorMessage}>{errors.password}</Text>
            ) : null }
            <Button
              title="Enviar"
              type="outline"
              disabled={!isValid}
              onPress={handleSubmit}
              buttonStyle={styles.submitButton}
            />
            <Message
              message={error.message}
              show={show}
              handleClose={this.clearErrors}
            />

            <View style={styles.containers}>
              <Button
                title="¿Olvidaste tu contraseña?"
                type="clear"
                onPress={this.resetPass}
              />
              <Text style={styles.enroll}>Para crear una cuenta nueva</Text>
              <Text style={styles.enroll}>necesitas estar afiliadx.</Text>
              <Button
                onPress={this.enroll}
                title="AFILIATE"
                buttonStyle={styles.enrollButton}
                type="outline"
              />
            </View>
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
