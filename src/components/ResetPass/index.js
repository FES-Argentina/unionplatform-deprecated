import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles';

import { changeUserPass } from '../../actions/user';


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
  passwordConfirm: yup
    .string()
    .label('Confirmar contraseña')
    .required(),
});

class ResetPass extends React.Component {
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
        initialErrors={{ email: '', password: '' }}
      >
        {({
          values, handleChange, handleBlur, isValid,
        }) => (
          <View>
            <Text style={styles.formTitles}>Cambiar contraseña</Text>

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
              <Input
                label="Confirmar contraseña"
                mode="outlined"
                value={values.passwordConfirm}
                onChangeText={handleChange('passwordConfirm')}
                placeholder="Confirmar contraseña"
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
              title="Guardar"
              type="outline"
              buttonStyle={styles.submitButton}
              disabled={!isValid}
              onPress={() => this.onSubmit(values)}
            />
          </View>
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
