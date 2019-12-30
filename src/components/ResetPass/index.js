import React from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles';

import { changeUserPass } from '../../actions/user';


const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('E-mail')
    .email("Ingrese un email válido")
    .required("Campo requerido"),
  password: yup
    .string()
    .label('Contraseña')
    .required("Campo requerido"),
  passwordConfirm: yup
    .string()
    .label('Confirmar contraseña')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required("Campo requerido"),
});

class ResetPass extends React.Component {
  constructor(props) {
    super(props);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }
  focusNextField(id) {
    this.inputs[id].focus();
  }
  onSubmit = (values) => {
    const { id } = values;

    const { onchangeUserPass } = this.props;
    onchangeUserPass(id, values);
  }

  render() {
    // FIX: user id value, pass validation
    return (
      <Formik
        initialValues={{
          email: '', password: '', passwordConfirm: '', id: 'frs',
        }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ name: '' }}
      >
        {({
          values, handleChange, isValid, setFieldValue, submitForm, errors, touched, handleBlur
        }) => (
          <ScrollView>
            <Text style={styles.formTitles}>Cambiar contraseña</Text>

              <Input
                label="E-mail"
                mode="outlined"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="E-mail"
                labelStyle={styles.inputslabel}
                keyboardType="email-address"
                valid={touched.email && !errors.email}
                error={touched.email && errors.email}
                returnKeyType="next"
                autoCapitalize="none"
                leftIcon={(
                  <Icon
                    name="envelope"
                    size={12}
                    color="grey"
                  />
                )}
                returnKeyType="next"
                ref={ input => {
                  this.inputs['email'] = input;
                }}
                onSubmitEditing={() => {
                  this.focusNextField('password');
                }}
                blurOnSubmit={false}
              />

              {errors.email && touched.email ? (
                  <Text style={styles.formError}>{errors.email}</Text>
              ) : null }

              <Input
                label="Contraseña"
                mode="outlined"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                placeholder="Ingrese su password"
                labelStyle={styles.inputslabel}
                leftIcon={(
                  <Icon
                    name="key"
                    size={12}
                    color="grey"
                  />
                )}
                returnKeyType="next"
                ref={ input => {
                  this.inputs['password'] = input;
                }}
                onSubmitEditing={() => {
                  this.focusNextField('passwordConfirm');
                }}
                blurOnSubmit={false}
                valid={touched.password && !errors.password}
                error={touched.password && errors.password}
              />
            {errors.password && touched.password ? (
                  <Text style={styles.formError}>{errors.password}</Text>
              ) : null }

              <Input
                label="Confirmar contraseña"
                mode="outlined"
                value={values.passwordConfirm}
                onChangeText={handleChange('passwordConfirm')}
                onBlur={handleBlur('passwordConfirm')}
                secureTextEntry
                placeholder="Reingrese su password"
                labelStyle={styles.inputslabel}
                leftIcon={(
                  <Icon
                    name="key"
                    size={12}
                    color="grey"
                  />
                )}
                returnKeyType="next"
                ref={ input => {
                  this.inputs['passwordConfirm'] = input;
                }}
                onSubmitEditing={() => {
                  submitForm();
                }}
                blurOnSubmit={false}
                valid={touched.passwordConfirm && !errors.passwordConfirm}
                error={touched.passwordConfirm && errors.passwordConfirm}
              />
            {errors.passwordConfirm && touched.passwordConfirm ? (
                  <Text style={styles.formError}>{errors.passwordConfirm}</Text>
              ) : null }
            <Button
              title="Guardar"
              type="outline"
              buttonStyle={styles.submitButton}
              disabled={!isValid}
              onPress={() => this.onSubmit(values)}
            />
          </ScrollView>
        )}
      </Formik>
    );
  }
}

ResetPass.propTypes = {
  onchangeUserPass: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onchangeUserPass: (id, newValues) => {
    dispatch(changeUserPass(id, newValues));
  },
});


const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);
