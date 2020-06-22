import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { newPassword } from '../../actions/user';
import { clearErrors } from '../../actions';
import styles from '../styles';
import Message from '../Message';


const validationSchema = yup.object().shape({
  nameOrEmail: yup
    .string()
    .label('Usuarix o E-mail')
    .required("Campo requerido"),
});

class ResetPass extends React.Component {
  onSubmit = (values) => {
    const { requestNewPassword } = this.props;
    const { nameOrEmail } = values;
    requestNewPassword(nameOrEmail);
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusSubscription = navigation.addListener('willFocus', this.clearErrors);
  }

  componentWillUnmount() {
    this.focusSubscription.remove();
  }

  clearErrors = () => {
    const { clearErrorMessage } = this.props;
    clearErrorMessage();
  }

  render() {
    const { error } = this.props;
    const show = error.message ? true : false;

    return (
      <Formik
        initialValues={{ nameOrEmail: '' }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ nameOrEmail: '' }}
      >
        {({ values, handleChange, submitForm, isValid, errors, touched }) => (
          <ScrollView>
            <Text style={styles.formTitles}>Solicitar nueva contraseña</Text>
            <Text style={styles.formText}>
              Las instrucciones para restablecer la contraseña se enviarán a la
              dirección de correo electrónico con la que te registraste.
            </Text>

              <Input
                label="Usuarix o E-mail"
                mode="outlined"
                value={values.nameOrEmail}
                onChangeText={handleChange('nameOrEmail')}
                placeholder="Usuarix o E-mail"
                labelStyle={styles.inputslabel}
                keyboardType="email-address"
                valid={touched.nameOrEmail && !errors.nameOrEmail}
                error={touched.nameOrEmail && errors.nameOrEmail}
                returnKeyType="done"
                autoCapitalize="none"
                leftIcon={<Icon name="id-badge" size={12} color="grey" />}
                blurOnSubmit={false}
                onSubmitEditing={submitForm}
              />

              {errors.email && touched.email ? (
                  <Text style={styles.formErrorMessage}>{errors.email}</Text>
              ) : null }

            <Button
              title="Enviar"
              type="outline"
              buttonStyle={styles.submitButton}
              disabled={!isValid}
              onPress={submitForm}
            />
            <Message
              message={error.message}
              show={show}
              handleClose={this.clearErrors}
            />
          </ScrollView>
        )}
      </Formik>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestNewPassword: (nameOrEmail) => {
    dispatch(newPassword(nameOrEmail));
  },
  clearErrorMessage: () => {
    dispatch(clearErrors());
  }
});

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);
