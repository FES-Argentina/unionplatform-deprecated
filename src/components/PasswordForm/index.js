import React from 'react';
import { ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';



const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .label('Contraseña actual')
    .when('$currentPassword', (currentPassword, schema) => (currentPassword ? schema.isRequired('Campo requerido') : schema)),
  password: yup
    .string()
    .label('Contraseña')
    .required('Campo requerido'),
  passwordConfirm: yup
    .string()
    .label('Confirmar contraseña')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Campo requerido'),
});

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  }

  render() {
    const { askCurrentPassword, onSubmit } = this.props;
    return (
      <Formik
        initialValues={{ currentPassword: '', password: '', passwordConfirm: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        context={{ currentPassword: askCurrentPassword }}
      >
        {({ values, handleChange, isValid, setFieldValue, submitForm, errors, touched, handleBlur }) => (
          <ScrollView>
            <Text style={styles.formTitles}>Cambiar contraseña</Text>

            {askCurrentPassword ? (
              <Input
                label="Contraseña actual"
                mode="outlined"
                value={values.currentPassword}
                autoCapitalize="none"
                onChangeText={handleChange('currentPassword')}
                onBlur={handleBlur('currentPassword')}
                secureTextEntry
                placeholder="Ingrese su contraseña"
                labelStyle={styles.inputslabel}
                leftIcon={(<Icon name="key" size={12} color="grey" />)}
                returnKeyType="next"
                ref={(input) => {
                  this.inputs['currentPassword'] = input;
                }}
                onSubmitEditing={() => {
                  this.focusNextField('password');
                }}
                blurOnSubmit={false}
                valid={touched.currentPassword && !errors.currentPassword}
                error={touched.currentPassword && errors.currentPassword}
              />
              ) : null
            }

            {errors.currentPassword && touched.currentPassword ? (
                <Text style={styles.formErrorMessage}>{errors.currentPassword}</Text>
              ) : null
            }

            <Input
              label="Contraseña"
              mode="outlined"
              value={values.password}
              autoCapitalize="none"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              placeholder="Ingrese su password"
              labelStyle={styles.inputslabel}
              leftIcon={(<Icon name="key" size={12} color="grey" />)}
              returnKeyType="next"
              ref={(input) => {
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
                <Text style={styles.formErrorMessage}>{errors.password}</Text>
              ) : null
            }

            <Input
              label="Confirmar contraseña"
              mode="outlined"
              value={values.passwordConfirm}
              autoCapitalize="none"
              onChangeText={handleChange('passwordConfirm')}
              onBlur={handleBlur('passwordConfirm')}
              secureTextEntry
              placeholder="Reingrese su password"
              labelStyle={styles.inputslabel}
              leftIcon={(<Icon name="key" size={12} color="grey" />)}
              returnKeyType="done"
              ref={(input) => {
                this.inputs['passwordConfirm'] = input;
              }}
              onSubmitEditing={submitForm}
              blurOnSubmit={false}
              valid={touched.passwordConfirm && !errors.passwordConfirm}
              error={touched.passwordConfirm && errors.passwordConfirm}
            />
            {errors.passwordConfirm && touched.passwordConfirm ? (
                  <Text style={styles.formErrorMessage}>{errors.passwordConfirm}</Text>
              ) : null
            }

            <Button
              title="Guardar"
              type="outline"
              buttonStyle={styles.submitButton}
              disabled={!isValid}
              onPress={submitForm}
            />
          </ScrollView>
        )}
      </Formik>
    );
  }
}

PasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  askCurrentPassword: PropTypes.bool,
};

PasswordForm.defaultProps = {
  askCurrentPassword: true,
};

export default PasswordForm;
