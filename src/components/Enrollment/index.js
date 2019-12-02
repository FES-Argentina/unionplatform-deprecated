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
  birthdate: yup
    .date()
    .label('Fecha de nacimiento')
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
  companies: yup
    .boolean().oneOf([true], 'Please check at least one'),
});

class Enrollment extends React.Component {
  onSubmit = (values) => {
    const { firstname, lastname, nationality, birthdate, cuit, dni, email, phonenumber, street, postalcode, city, province, country, tasks, companies } = values;
  }

  render() {

    const companies = [
      {
        name: 'Cabify',
        key: 'Cabify',
      },
      {
        name: 'Uber',
        key: 'Uber',
      },
      {
        name: 'Glovo',
        key: 'Glovo',
      },
      {
        name: 'Rappi',
        key: 'Rappi',
      },
    ];

    return (
      <Formik
        initialValues={{ firstname:'', lastname: '', email: '', phonenumber: '', city: '',  tasks: '', companies: '', nationality: '', birthdate: '', cuit: '', dni: '', street: '', postalcode: '', province: '', country: ''  }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ email: '' }}
      >
        {({
          values, handleChange, handleBlur, handleSubmit, isValid,
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
            />
            <Input
              label="Fecha de nacimiento"
              mode="outlined"
              value={values.birthdate}
              onChangeText={handleChange('birthdate')}
              placeholder="Ingrese su fecha de nacimiento"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="birthday-cake"
                  size={12}
                  color="grey"
                />
              )}
            />
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
            />
          <Text style={styles.formTitles}>Sobre tu trabajo</Text>
            <Input
              label="Tareas"
              mode="outlined"
              multiline
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
            />

          <Select options={companies} label="Empresa" />

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
  saveEnrollment: () => dispatch(setEnrollment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Enrollment);
