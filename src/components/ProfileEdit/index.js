import React from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Selector from '../form/Selector';
import { companies } from '../../utils/values';
import styles from '../styles';

import { updateUserAction } from '../../actions/user';


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label('Alias')
    .min(2, "El alias debe tener más de ${min} caracteres")
    .required("Campo requerido"),
  email: yup
    .string()
    .label('E-mail personal')
    .email("Ingrese un email válido")
    .required("Campo requerido"),
  workemail: yup
    .string()
    .label('E-mail del trabajo')
    .email("Ingrese un email válido")
    .required("Campo requerido"),
});

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  }

  onSubmit = (values) => {
    const { id } = values;

    const { onUpdateUserAction } = this.props;
    onUpdateUserAction(id, values);
  }


  render() {
    // FIXME: user id value
    return (
      <Formik
        initialValues={{
           workemail: '', email: '', username: '', id: 'efd',
        }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ name: '' }}
      >
        {({
          values, handleChange, isValid, setFieldValue, submitForm, errors, touched, handleBlur
        }) => (
          <ScrollView>
            <Selector items={companies} name="company" label="Empresa" setFieldValue={setFieldValue}/>
            <Text style={styles.formTitles}>Perfil</Text>

              <Input
                label="Alias"
                mode="outlined"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder="Ingrese su alias"
                labelStyle={styles.inputslabel}
                leftIcon={(
                  <Icon
                    name="user"
                    size={12}
                    color="grey"
                  />
                )}
                returnKeyType="next"
                ref={ input => {
                  this.inputs['username'] = input;
                }}
                onSubmitEditing={() => {
                  this.focusNextField('email');
                }}
                blurOnSubmit={false}
                valid={touched.username && !errors.username}
                error={touched.username && errors.username}
              />
            {errors.username && touched.username ? (
                  <Text style={styles.formError}>{errors.username}</Text>
              ) : null }

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
                ref={ input => {
                  this.inputs['email'] = input;
                }}
                onSubmitEditing={() => {
                  this.focusNextField('workemail');
                }}
                blurOnSubmit={false}
              />
              {errors.email && touched.email ? (
                  <Text style={styles.formError}>{errors.email}</Text>
              ) : null }
              <Input
                label="E-mail del trabajo"
                mode="outlined"
                value={values.workemail}
                onChangeText={handleChange('workemail')}
                onBlur={handleBlur('workemail')}
                placeholder="E-mail del trabajo"
                labelStyle={styles.inputslabel}
                keyboardType="email-address"
                valid={touched.workemail && !errors.workemail}
                error={touched.workemail && errors.workemail}
                returnKeyType="done"
                leftIcon={(
                  <Icon
                    name="envelope"
                    size={12}
                    color="grey"
                  />
                )}
                ref={ input => {
                  this.inputs['workemail'] = input;
                }}
                onSubmitEditing={() => {
                  submitForm();
                }}
                blurOnSubmit={false}
              />
              {errors.workemail && touched.workemail ? (
                  <Text style={styles.formError}>{errors.workemail}</Text>
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
