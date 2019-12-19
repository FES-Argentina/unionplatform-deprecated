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

const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .label('Nombre')
    .required(),
  lastname: yup
    .string()
    .label('Apellido')
    .required(),
  nationality: yup
    .string()
    .label('Nacionalidad')
    .required(),
  email: yup
    .string()
    .label('E-mail')
    .email()
    .required(),
  phonenumber: yup
    .number()
    .label('Telefono')
    .required(),
  dni: yup
    .number()
    .label('DNI')
    .required(),
  cuit: yup
    .number()
    .label('CUIT/CUIL')
    .required(),
  postalcode: yup
    .number()
    .label('Codigo postal')
    .required(),
  street: yup
    .string()
    .label('Calle')
    .required(),
  city: yup
    .string()
    .label('Localidad')
    .required(),
  province: yup
    .string()
    .label('Provincia')
    .required(),
  country: yup
    .string()
    .label('Pais')
    .required(),
  tasks: yup
    .string()
    .label('Tareas')
    .required(),
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
        initialErrors={{ email: '' }}
      >
        {({
          values, handleChange, handleBlur, handleSubmit, isValid, setFieldValue, submitForm
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
            />
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
            />
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
            />
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
            />
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
            />
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
              ref={ input => {
                this.inputs['dni'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('nationality');
              }}
              blurOnSubmit={false}
            />
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
            />
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
            />
            <Input
              label="Codigo postal"
              mode="outlined"
              value={values.postalcode}
              onChangeText={handleChange('postalcode')}
              placeholder="Ingrese su codigo postal"
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
              ref={ input => {
                this.inputs['postalcode'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('city');
              }}
              blurOnSubmit={false}
            />
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
            />
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
            />
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
            />
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
            />



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
