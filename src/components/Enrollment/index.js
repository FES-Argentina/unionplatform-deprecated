import React from 'react';
import {
  View, Text, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setEnrollment } from '../../actions/user';
import Selector from '../form/Selector';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import styles from '../styles';

const regExp = /\b\d{5}\b/;


const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .label('Nombre')
    .min(2, "El nombre debe tener más de ${min} caracteres")
    .required("Campo requerido"),
  lastname: yup
    .string()
    .label('Apellido')
    .min(2, "El apellido debe tener más de ${min} caracteres")
    .required("Campo requerido"),
  nationality: yup
    .string()
    .label('Nacionalidad')
    .min(2, "La nacionalidad debe tener más de ${min} caracteres")
    .required("Campo requerido"),
  email: yup
    .string()
    .label('E-mail')
    .email("Ingrese un email válido")
    .required("Campo requerido"),
  phonenumber: yup
    .number()
    .min(8, 'El teléfono debe tener al menos ${min} caracteres')
    .typeError('El teléfono debe estar expresado en números')
    .positive('El teléfono debe ser mayor a 0')
    .label('Telefono')
    .required("Campo requerido"),
  dni: yup
    .number()
    .label('DNI')
    .min(7, 'El DNI debe tener al menos ${min} caracteres')
    .typeError('El DNI debe estar expresado en números')
    .positive('El DNI debe ser mayor a 0')
    .required("Campo requerido"),
  cuit: yup
    .number()
    .min(10, 'El CUIT/CUIL debe tener al menos ${min} caracteres')
    .typeError('El CUIT/CUIL debe estar expresado en números')
    .positive('El CUIT/CUIL debe ser mayor a 0')
    .label('CUIT/CUIL')
    .required("Campo requerido"),
  postalcode: yup
    .number()
    .min(4, 'El código postal debe tener al menos ${min} caracteres')
    .typeError('El código postal debe estar expresado en números')
    .positive('El código postal debe ser mayor a 0')
    .label('Código postal')
    .required("Campo requerido"),
  street: yup
    .string()
    .label('Calle')
    .min(2, "La calle debe tener más de ${min} caracteres")
    .required("Campo requerido"),
  city: yup
    .string()
    .label('Localidad')
    .min(2, "La localidad debe tener más de ${min} caracteres")
    .required("Campo requerido"),
  province: yup
    .string()
    .label('Provincia')
    .min(2, "La provincia debe tener más de ${min} caracteres")
    .required("Campo requerido"),
  country: yup
    .string()
    .label('País')
    .min(2, "El país debe tener más de ${min} caracteres")
    .required("Campo requerido"),
  tasks: yup
    .string()
    .label('Tareas')
    .min(2, "Ingrese valores correctos")
    .required("Campo requerido"),
});

class Enrollment extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};

    this.state  = {
      date: new Date(1598051730000),
      mode: 'date',
      show: false,
    }
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  }

  onSubmit = (values) => {
    values.birthdate = this.state.date;
    console.warn(values);
    const { saveEnrollment } = this.props;
    saveEnrollment(values);
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }
  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }
  datepicker = () => {
    this.show('date');
  }

  render() {
    const { show, date, mode } = this.state;
    const items = [
      { id: 'Cabify', name: 'Cabify' },
      { id: 'Uber', name: 'Uber' },
      { id: 'Glovo', name: 'Glovo' },
      { id: 'Rappi', name: 'Rappi' },
    ];

    return (
      <Formik
        initialValues={{ firstname:'', lastname: '', email: '', phonenumber: '', city: '',  tasks: '', nationality: '', cuit: '', dni: '', street: '', postalcode: '', province: '', country: ''  }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ name: '' }}
      >
        {({
          values, handleChange, isValid, setFieldValue, submitForm, errors, touched, handleBlur, handleSubmit
        }) => (
          <ScrollView>
            <Text style={styles.formTitles}>Sobre vos</Text>
            <Input
              label="Nombre"
              mode="outlined"
              value={values.firstname}
              onChangeText={handleChange('firstname')}
              onBlur={handleBlur('firstname')}
              placeholder="Ingrese su nombre"
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
                this.inputs['firstname'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('lastname');
              }}
              blurOnSubmit={false}
              valid={touched.firstname && !errors.firstname}
              error={touched.firstname && errors.firstname}
            />
          {errors.firstname && touched.firstname ? (
                <Text style={styles.formError}>{errors.firstname}</Text>
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
                <Icon
                  name="user"
                  size={12}
                  color="grey"
                />
              )}
              returnKeyType="next"
              ref={ input => {
                this.inputs['lastname'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('email');
              }}
              blurOnSubmit={false}
              valid={touched.lastname && !errors.lastname}
              error={touched.lastname && errors.lastname}
            />
          {errors.lastname && touched.lastname ? (
                <Text style={styles.formError}>{errors.lastname}</Text>
            ) : null }
            <Input
              label="E-mail"
              mode="outlined"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Ingrese su e-mail"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="envelope"
                  size={12}
                  color="grey"
                />
              )}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              ref={ input => {
                this.inputs['email'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('phonenumber');
              }}
              blurOnSubmit={false}
              valid={touched.email && !errors.email}
              error={touched.email && errors.email}
            />
            {errors.email && touched.email ? (
                <Text style={styles.formError}>{errors.email}</Text>
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
                <Icon
                  name="phone"
                  size={12}
                  color="grey"
                />
              )}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              ref={ input => {
                this.inputs['phonenumber'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('cuit');
              }}
              blurOnSubmit={false}
              valid={touched.phonenumber && !errors.phonenumber}
              error={touched.phonenumber && errors.phonenumber}
            />
            {errors.phonenumber && touched.phonenumber ? (
                <Text style={styles.formError}>{errors.phonenumber}</Text>
            ) : null }

            <View>
              <Text style={styles.date}>Elija su fecha de nacimiento</Text>
              <Button
                title="Fecha de nacimiento"
                type="outline"
                buttonStyle={styles.enrollButton}
                testID="datePickerButton"
                onPress={this.datepicker}
                />

            { show && <DateTimePicker testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={this.setDate} /> }
            </View>
            <Input
              label="Cuit"
              mode="outlined"
              value={values.cuit}
              onChangeText={handleChange('cuit')}
              onBlur={handleBlur('cuit')}
              placeholder="Ingrese su teléfono"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              ref={ input => {
                this.inputs['cuit'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('dni');
              }}
              blurOnSubmit={false}
              valid={touched.cuit && !errors.cuit}
              error={touched.cuit && errors.cuit}
            />
          {errors.cuit && touched.cuit ? (
                <Text style={styles.formError}>{errors.cuit}</Text>
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
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              ref={ input => {
                this.inputs['dni'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('nationality');
              }}
              blurOnSubmit={false}
              valid={touched.dni && !errors.dni}
              error={touched.dni && errors.dni}
            />
          {errors.dni && touched.dni ? (
                <Text style={styles.formError}>{errors.dni}</Text>
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
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              returnKeyType="next"
              ref={ input => {
                this.inputs['nationality'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('street');
              }}
              blurOnSubmit={false}
              valid={touched.nationality && !errors.nationality}
              error={touched.nationality && errors.nationality}
            />
          {errors.nationality && touched.nationality ? (
                <Text style={styles.formError}>{errors.nationality}</Text>
            ) : null }
            <Input
              label="Calle"
              mode="outlined"
              value={values.street}
              onChangeText={handleChange('street')}
              onBlur={handleBlur('street')}
              placeholder="Ingrese su direccion"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              returnKeyType="next"
              ref={ input => {
                this.inputs['street'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('postalcode');
              }}
              blurOnSubmit={false}
              valid={touched.street && !errors.street}
              error={touched.street && errors.street}
            />
          {errors.street && touched.street ? (
                <Text style={styles.formError}>{errors.street}</Text>
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
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              ref={ input => {
                this.inputs['postalcode'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('city');
              }}
              blurOnSubmit={false}
              valid={touched.postalcode && !errors.postalcode}
              error={touched.postalcode && errors.postalcode}
            />
          {errors.postalcode && touched.postalcode ? (
                <Text style={styles.formError}>{errors.postalcode}</Text>
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
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              returnKeyType="next"
              ref={ input => {
                this.inputs['city'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('province');
              }}
              blurOnSubmit={false}
              valid={touched.city && !errors.city}
              error={touched.city && errors.city}
            />
          {errors.city && touched.city ? (
                <Text style={styles.formError}>{errors.city}</Text>
            ) : null }
            <Input
              label="Prinvincia"
              mode="outlined"
              value={values.province}
              onChangeText={handleChange('province')}
              onBlur={handleBlur('province')}
              placeholder="Ingrese su provincia"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              returnKeyType="next"
              ref={ input => {
                this.inputs['province'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('country');
              }}
              blurOnSubmit={false}
              valid={touched.province && !errors.province}
              error={touched.province && errors.province}
            />
          {errors.province && touched.province ? (
                <Text style={styles.formError}>{errors.province}</Text>
            ) : null }
            <Input
              label="País"
              mode="outlined"
              value={values.country}
              onChangeText={handleChange('country')}
              onBlur={handleBlur('country')}
              placeholder="Ingrese el país"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              returnKeyType="next"
              ref={ input => {
                this.inputs['country'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('tasks');
              }}
              blurOnSubmit={false}
              valid={touched.country && !errors.country}
              error={touched.country && errors.country}
            />
          {errors.country && touched.country ? (
                <Text style={styles.formError}>{errors.country}</Text>
            ) : null }
          <Text style={styles.formTitles}>Sobre tu trabajo</Text>
            <Selector items={items} name="company" label="Empresa" setFieldValue={setFieldValue}/>
              <Input
                label="Tareas"
                mode="outlined"
                value={values.tasks}
                onChangeText={handleChange('tasks')}
                onBlur={handleBlur('tasks')}
                placeholder="Ingrese sus tareas"
                labelStyle={styles.inputslabel}
                leftIcon={(
                  <Icon
                    name="address-card"
                    size={12}
                    color="grey"
                  />
                )}
                returnKeyType="done"
                ref={ input => {
                  this.inputs['tasks'] = input;
                }}
                onSubmitEditing={() => {
                  submitForm();
                }}
                blurOnSubmit={false}
                valid={touched.tasks && !errors.tasks}
                error={touched.tasks && errors.tasks}
              />
            {errors.tasks && touched.tasks ? (
                  <Text style={styles.formError}>{errors.tasks}</Text>
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

Enrollment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  saveEnrollment: (values) => {
    dispatch(setEnrollment(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Enrollment);
