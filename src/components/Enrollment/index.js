import React from 'react';
import {
  View, Text, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input, CheckBox } from 'react-native-elements';
import Select from '../form/Select';
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
    .required("Campo obligatorio"),
  lastname: yup
    .string()
    .label('Apellido')
    .min(2, "El apellido debe tener más de ${min} caracteres")
    .required("Campo obligatorio"),
  nationality: yup
    .string()
    .label('Nacionalidad')
    .min(2, "La nacionalidad debe tener más de ${min} caracteres")
    .required("Campo obligatorio"),
  email: yup
    .string()
    .label('E-mail')
    .email("Ingrese un email válido")
    .required("Campo obligatorio"),
  phonenumber: yup
    .number()
    .min(8, 'El teléfono debe tener al menos ${min} caracteres')
    .typeError('El teléfono debe estar expresado en números')
    .positive('El teléfono debe ser mayor a 0')
    .label('Telefono')
    .required("Campo obligatorio"),
  dni: yup
    .number()
    .label('DNI')
    .min(7, 'El DNI debe tener al menos ${min} caracteres')
    .typeError('El DNI debe estar expresado en números')
    .positive('El DNI debe ser mayor a 0')
    .required("Campo obligatorio"),
  cuit: yup
    .number()
    .min(10, 'El CUIT/CUIL debe tener al menos ${min} caracteres')
    .typeError('El CUIT/CUIL debe estar expresado en números')
    .positive('El CUIT/CUIL debe ser mayor a 0')
    .label('CUIT/CUIL')
    .required("Campo obligatorio"),
  postalcode: yup
    .number()
    .min(4, 'El código postal debe tener al menos ${min} caracteres')
    .typeError('El código postal debe estar expresado en números')
    .positive('El código postal debe ser mayor a 0')
    .label('Código postal')
    .required("Campo obligatorio"),
  street: yup
    .string()
    .label('Calle')
    .min(2, "La calle debe tener más de ${min} caracteres")
    .required("Campo obligatorio"),
  city: yup
    .string()
    .label('Localidad')
    .min(2, "La localidad debe tener más de ${min} caracteres")
    .required("Campo obligatorio"),
  province: yup
    .string()
    .label('Provincia')
    .min(2, "La provincia debe tener más de ${min} caracteres")
    .required("Campo obligatorio"),
  country: yup
    .string()
    .label('País')
    .min(2, "El país debe tener más de ${min} caracteres")
    .required("Campo obligatorio"),
  tasks: yup
    .string()
    .label('Tareas')
    .min(2, "Ingrese valores correctos")
    .required("Campo obligatorio"),
});

class Enrollment extends React.Component {
  constructor(props) {
    super(props);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};

    this.state  = {
      date: new Date(1598051730000),
      mode: 'date',
      show: false,
    }
  }
  focusNextField(id) {
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
            {errors.firstname && (
                <Text style={styles.formError}>{errors.firstname}</Text>
            )}
            <Input
              label="Apellido"
              mode="outlined"
              value={values.lastname}
              onChangeText={handleChange('lastname')}
              onBlur={handleBlur('namlastnamee')}
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
            {errors.lastname && (
                <Text style={styles.formError}>{errors.lastname}</Text>
            )}
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
            {errors.email && (
                <Text style={styles.formError}>{errors.email}</Text>
            )}
            <Input
              label="Número de teléfono"
              mode="outlined"
              value={values.phonenumber}
              onChangeText={handleChange('phonenumber')}
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
              maxLength={10}
              valid={touched.phonenumber && !errors.phonenumber}
              error={touched.phonenumber && errors.phonenumber}
            />
            {errors.phonenumber && (
                <Text style={styles.formError}>{errors.phonenumber}</Text>
            )}
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
              label="CUIT/CUIL"
              mode="outlined"
              value={values.cuit}
              onChangeText={handleChange('cuit')}
              placeholder="Ingrese su CUIT/CUIL"
              labelStyle={styles.inputslabel}
              maxLength={11}
              leftIcon={(
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              keyboardType="numeric"
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
            {errors.cuit && (
                <Text style={styles.formError}>{errors.cuit}</Text>
            )}
            <Input
              label="DNI"
              mode="outlined"
              value={values.dni}
              onChangeText={handleChange('dni')}
              placeholder="Ingrese su DNI"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              keyboardType="numeric"
              autoCapitalize="none"
              returnKeyType="next"
              maxLength={8}
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
            {errors.dni && (
                <Text style={styles.formError}>{errors.dni}</Text>
            )}
            <Input
              label="Nacionalidad"
              mode="outlined"
              value={values.nationality}
              onChangeText={handleChange('nationality')}
              placeholder="Ingrese la nacionalidad"
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
            {errors.nationality && (
                <Text style={styles.formError}>{errors.nationality}</Text>
            )}
            <Input
              label="Calle"
              mode="outlined"
              value={values.street}
              onChangeText={handleChange('street')}
              placeholder="Ingrese la calle"
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
            {errors.street && (
                <Text style={styles.formError}>{errors.street}</Text>
            )}
            <Input
              label="Codigo postal"
              mode="outlined"
              value={values.postalcode}
              onChangeText={handleChange('postalcode')}
              placeholder="Ingrese su codigo postal"
              labelStyle={styles.inputslabel}
              maxLength={6}
              leftIcon={(
                <Icon
                  name="address-card"
                  size={12}
                  color="grey"
                />
              )}
              keyboardType="numeric"
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
            {errors.postalcode && (
                <Text style={styles.formError}>{errors.postalcode}</Text>
            )}
            <Input
              label="Ciudad"
              mode="outlined"
              value={values.city}
              onChangeText={handleChange('city')}
              placeholder="Ingrese la ciudad"
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
            {errors.city && (
                <Text style={styles.formError}>{errors.city}</Text>
            )}
            <Input
              label="Provincia"
              mode="outlined"
              value={values.province}
              onChangeText={handleChange('province')}
              placeholder="Ingrese la provincia"
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
            {errors.province && (
                <Text style={styles.formError}>{errors.province}</Text>
            )}
            <Input
              label="Pais"
              mode="outlined"
              value={values.country}
              onChangeText={handleChange('country')}
              placeholder="Ingrese el pais"
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
            {errors.country && (
                <Text style={styles.formError}>{errors.country}</Text>
            )}
          <Text style={styles.formTitles}>Sobre tu trabajo</Text>
            <Selector items={items} label="Empresa" setFieldValue={setFieldValue}/>
            <Input
              label="Tareas"
              mode="outlined"
              value={values.tasks}
              onChangeText={handleChange('tasks')}
              onBlur={handleBlur('tasks')}
              placeholder="Ingrese las tareas que realiza"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="tasks"
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
            {errors.tasks && (
                <Text style={styles.formError}>{errors.tasks}</Text>
            )}



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
