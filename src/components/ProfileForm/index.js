import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import PropTypes from 'prop-types';
import moment from 'moment';
import Options from '../form/Options';
import Dropdown from '../form/Dropdown';
import styles from '../styles';
import { companies, provinces } from '../../utils/values';
import { defaultProfile } from '../../utils/defaults';
import cuitValidator from 'cuit-validator';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label('Usuarix')
    .min(3, 'El nombre de usuarix debe tener más de ${min} caracteres')
    .matches(/^[a-zA-Z0-9_\-]*$/, 'Solo letras, números y guiones.')
    .required('Campo requerido'),
  firstname: yup
    .string()
    .label('Nombre')
    .min(2, 'El nombre debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  lastname: yup
    .string()
    .label('Apellido')
    .min(2, 'El apellido debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  nationality: yup
    .string()
    .label('Nacionalidad')
    .min(2, 'La nacionalidad debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  mail: yup
    .string()
    .label('E-mail')
    .email('Ingrese. un email válido')
    .required('Campo requerido'),
  phonenumber: yup
    .string()
    .label('Teléfono')
    .required('Campo requerido'),
  dni: yup
    .number()
    .label('DNI')
    .min(7, 'El DNI debe tener al menos ${min} caracteres')
    .typeError('El DNI debe estar expresado en números')
    .positive('El DNI debe ser mayor a 0')
    .required('Campo requerido'),
  cuit: yup
    .number()
    .test('test-cuit', 'CUIT no válido', (value) => value && cuitValidator(value.toString()))
    .min(10, 'El CUIT/CUIL debe tener al menos ${min} caracteres')
    .typeError('El CUIT/CUIL debe estar expresado en números')
    .positive('El CUIT/CUIL debe ser mayor a 0')
    .label('CUIT/CUIL')
    .required('Campo requerido'),
  postalcode: yup
    .number()
    .min(4, 'El código postal debe tener al menos ${min} caracteres')
    .typeError('El código postal debe estar expresado en números')
    .positive('El código postal debe ser mayor a 0')
    .label('Código postal')
    .required('Campo requerido'),
  address: yup
    .string()
    .label('Calle')
    .min(2, 'La calle debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  city: yup
    .string()
    .label('Localidad')
    .min(2, 'La localidad debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  country: yup
    .string()
    .label('País')
    .min(2, 'El país debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  tasks: yup
    .string()
    .label('Tareas')
    .min(2, 'Ingrese valores correctos')
    .required('Campo requerido'),
});

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};

    const { profile } = this.props;
    this.state = {
      date: (profile.birthdate) ? new Date(profile.birthdate) : new Date(1990, 0, 1),
    };
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  }

  onSubmit = (values) => {
    const { date } = this.state;
    const { onSubmit } = this.props;
    const profile = {
      ...values,
      birthdate: moment(date).format('YYYY-MM-DD'),
    };
    onSubmit(profile);
  }


  render() {
    const { date} = this.state;
    const { profile } = this.props;
    return (
      <Formik
        initialValues={profile}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
      >
        {({
          values, handleChange, isValid, setFieldValue, submitForm, errors, touched, handleBlur, handleSubmit,
        }) => (
          <ScrollView>
            <Text style={styles.formTitles}>Sobre vos</Text>
            {!profile.username ? (
              <>
                <Input
                  label="Usuarix"
                  mode="outlined"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  placeholder="Ingrese un nombre de usuarix"
                  labelStyle={styles.inputslabel}
                  leftIcon={(
                    <Icon name="user" size={12} color="grey" />
                  )}
                  autoCapitalize="none"
                  returnKeyType="next"
                  ref={(input) => {
                    this.inputs.username = input;
                  }}
                  onSubmitEditing={() => {
                    this.focusNextField('mail');
                  }}
                  blurOnSubmit={false}
                  valid={touched.username && !errors.username}
                  error={touched.username && errors.username}
                />
                {errors.username && touched.username ? (
                  <Text style={styles.formErrorMessage}>{errors.username}</Text>
                ) : null }
                <Input
                  label="E-mail"
                  mode="outlined"
                  value={values.mail}
                  onChangeText={handleChange('mail')}
                  onBlur={handleBlur('mail')}
                  placeholder="Ingrese su e-mail"
                  labelStyle={styles.inputslabel}
                  leftIcon={(
                    <Icon name="envelope" size={12} color="grey" />
                  )}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  ref={(input) => {
                    this.inputs.mail = input;
                  }}
                  onSubmitEditing={() => {
                    this.focusNextField('firstname');
                  }}
                  blurOnSubmit={false}
                  valid={touched.mail && !errors.mail}
                  error={touched.mail && errors.mail}
                />
                {errors.mail && touched.mail ? (
                  <Text style={styles.formErrorMessage}>{errors.mail}</Text>
                ) : null }
              </>
            ) : null }

            <Input
              label="Nombre"
              mode="outlined"
              value={values.firstname}
              onChangeText={handleChange('firstname')}
              onBlur={handleBlur('firstname')}
              placeholder="Ingrese su nombre"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="user" size={12} color="grey" />
              )}
              returnKeyType="next"
              ref={(input) => {
                this.inputs.firstname = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('lastname');
              }}
              blurOnSubmit={false}
              valid={touched.firstname && !errors.firstname}
              error={touched.firstname && errors.firstname}
            />
            {errors.firstname && touched.firstname ? (
              <Text style={styles.formErrorMessage}>{errors.firstname}</Text>
            ) : null }

            <Input
              label="Apellido"
              mode="outlined"
              value={values.lastname}
              onChangeText={handleChange('lastname')}
              onBlur={handleBlur('lastname')}
              placeholder="Ingrese su apellido"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="user" size={12} color="grey" />
              )}
              returnKeyType="next"
              ref={(input) => {
                this.inputs.lastname = input;
              }}
              onSubmitEditing={() => {
                this.phoneInput.focus();
              }}
              blurOnSubmit={false}
              valid={touched.lastname && !errors.lastname}
              error={touched.lastname && errors.lastname}
            />
            {errors.lastname && touched.lastname ? (
              <Text style={styles.formErrorMessage}>{errors.lastname}</Text>
            ) : null }

            <Input
              label="Teléfono"
              mode="outlined"
              value={values.phonenumber}
              onChangeText={handleChange('phonenumber')}
              onBlur={handleBlur('phonenumber')}
              placeholder="Ingrese su teléfono"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="address-card" size={12} color="grey" />
            )}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              ref={ref => {
                this.phoneInput = ref;
              }}
              onSubmitEditing={() => {
                this.focusNextField('cuit');
              }}
              blurOnSubmit={false}
              valid={touched.phonenumber && !errors.phonenumber}
              error={touched.phonenumber && errors.phonenumber}
            />
            {errors.phonenumber && touched.phonenumber ? (
              <Text style={styles.formErrorMessage}>{errors.phonenumber}</Text>
            ) : null }


            <Text style={styles.formLabel}>Fecha de nacimiento</Text>
            <View style={styles.containerCenter}>
              <DatePicker
                locale = "es"
                value={date}
                date={date}
                mode="date"
                onDateChange={(value) => {
                    this.state.date = value;
                    setFieldValue('birthdate', value);
                  }
                }
              />
            </View>

            <Input
              label="CUIT"
              mode="outlined"
              value={values.cuit}
              onChangeText={handleChange('cuit')}
              onBlur={handleBlur('cuit')}
              placeholder="Ingrese su CUIT"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="address-card" size={12} color="grey" />
            )}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              ref={(input) => {
                this.inputs.cuit = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('dni');
              }}
              blurOnSubmit={false}
              valid={touched.cuit && !errors.cuit}
              error={touched.cuit && errors.cuit}
            />
            {errors.cuit && touched.cuit ? (
              <Text style={styles.formErrorMessage}>{errors.cuit}</Text>
            ) : null }
            <Input
              label="DNI"
              mode="outlined"
              value={values.dni}
              onChangeText={handleChange('dni')}
              onBlur={handleBlur('dni')}
              placeholder="Ingrese su dni"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="address-card" size={12} color="grey" />
            )}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              ref={(input) => {
                this.inputs.dni = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('nationality');
              }}
              blurOnSubmit={false}
              valid={touched.dni && !errors.dni}
              error={touched.dni && errors.dni}
            />
            {errors.dni && touched.dni ? (
              <Text style={styles.formErrorMessage}>{errors.dni}</Text>
            ) : null }
            <Input
              label="Nacionalidad"
              mode="outlined"
              value={values.nationality}
              onChangeText={handleChange('nationality')}
              onBlur={handleBlur('nationality')}
              placeholder="Ingrese su nacionalidad"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="address-card" size={12} color="grey" />
            )}
              returnKeyType="next"
              ref={(input) => {
                this.inputs.nationality = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('address');
              }}
              blurOnSubmit={false}
              valid={touched.nationality && !errors.nationality}
              error={touched.nationality && errors.nationality}
            />
            {errors.nationality && touched.nationality ? (
              <Text style={styles.formErrorMessage}>{errors.nationality}</Text>
            ) : null }
            <Input
              label="Dirección"
              mode="outlined"
              value={values.address}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              placeholder="Ingrese su direccion"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="address-card" size={12} color="grey" />
            )}
              returnKeyType="next"
              ref={(input) => {
                this.inputs.address = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('postalcode');
              }}
              blurOnSubmit={false}
              valid={touched.address && !errors.address}
              error={touched.address && errors.address}
            />
            {errors.address && touched.address ? (
              <Text style={styles.formErrorMessage}>{errors.address}</Text>
            ) : null }
            <Input
              label="Código postal"
              mode="outlined"
              value={values.postalcode}
              onChangeText={handleChange('postalcode')}
              onBlur={handleBlur('postalcode')}
              placeholder="Ingrese su código postal"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="address-card" size={12} color="grey" />
            )}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              ref={(input) => {
                this.inputs.postalcode = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('city');
              }}
              blurOnSubmit={false}
              valid={touched.postalcode && !errors.postalcode}
              error={touched.postalcode && errors.postalcode}
            />
            {errors.postalcode && touched.postalcode ? (
              <Text style={styles.formErrorMessage}>{errors.postalcode}</Text>
            ) : null }
            <Input
              label="Ciudad"
              mode="outlined"
              value={values.city}
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              placeholder="Ingrese su ciudad"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="address-card" size={12} color="grey" />
            )}
              returnKeyType="next"
              ref={(input) => {
                this.inputs.city = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('country');
              }}
              blurOnSubmit={false}
              valid={touched.city && !errors.city}
              error={touched.city && errors.city}
            />
            {errors.city && touched.city ? (
              <Text style={styles.formErrorMessage}>{errors.city}</Text>
            ) : null }
            <Dropdown items={provinces} label="Provincia" name="province" defaultValue={profile.province} setFieldValue={setFieldValue}/>
            <Input
              label="País"
              mode="outlined"
              value={values.country}
              onChangeText={handleChange('country')}
              onBlur={handleBlur('country')}
              placeholder="Ingrese el país"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="address-card" size={12} color="grey" />
            )}
              returnKeyType="next"
              ref={(input) => {
                this.inputs.country = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('tasks');
              }}
              blurOnSubmit={false}
              valid={touched.country && !errors.country}
              error={touched.country && errors.country}
            />
            {errors.country && touched.country ? (
              <Text style={styles.formErrorMessage}>{errors.country}</Text>
            ) : null }
            <Text style={styles.formTitles}>Sobre tu trabajo</Text>
            <Options
              label="Empresa(s)"
              items={companies}
              defaultValue={profile.companies}
              onChange={(v) => setFieldValue('companies', v)}
            />
            <Text style={styles.bodyDetail}>Elegí al menos una opción</Text>
            <Input
              label="Tareas"
              mode="outlined"
              value={values.tasks}
              onChangeText={handleChange('tasks')}
              onBlur={handleBlur('tasks')}
              placeholder="Ingrese sus tareas"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon name="address-card" size={12} color="grey" />
            )}
              returnKeyType="done"
              ref={(input) => {
                this.inputs.tasks = input;
              }}
              onSubmitEditing={() => {
                submitForm();
              }}
              blurOnSubmit={false}
              valid={touched.tasks && !errors.tasks}
              error={touched.tasks && errors.tasks}
            />
            {errors.tasks && touched.tasks ? (
              <Text style={styles.formErrorMessage}>{errors.tasks}</Text>
            ) : null }

            <Button
              title="Enviar"
              type="outline"
              disabled={!isValid}
              onPress={handleSubmit}
              buttonStyle={styles.submitButton}
            />
          </ScrollView>
        )}
      </Formik>
    );
  }
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    companies: PropTypes.array.isRequired,
    created: PropTypes.string,
    birthdate: PropTypes.string,
    mail: PropTypes.string,
    cuit: PropTypes.string,
    dni: PropTypes.string,
    phonenumber: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    postalcode: PropTypes.string,
    country: PropTypes.string,
    tasks: PropTypes.string,
    nationality: PropTypes.string,
  }),
};

ProfileForm.defaultProps = {
  profile: defaultProfile,
};

export default ProfileForm;
