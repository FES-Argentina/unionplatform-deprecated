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
import { setComplaint } from '../../actions/user';
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
  email: yup
    .string()
    .label('E-mail')
    .email()
    .required(),
  phonenumber: yup
    .number()
    .label('Telefono')
    .required(),
  city: yup
    .string()
    .label('Localidad')
    .required(),
  seniority: yup
    .string()
    .label('Antigüedad')
    .required(),
  tasks: yup
    .string()
    .label('Tareas')
    .required(),
  companies: yup
    .boolean().oneOf([true], 'Please check at least one'),
  problems: yup
    .boolean().oneOf([true], 'Please check at least one')
});

class Complaint extends React.Component {
  onSubmit = (values) => {
    const { firstname, lastname, email, phonenumber, city, seniority, tasks, companies, problems } = values;
    const { saveComplaint } = this.props;
    saveComplaint(values);
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

    const problems = [
      {
        name: 'Tuve un accidente',
        key: 'accidente',
      },
      {
        name: 'Me bloquearon',
        key: 'bloqueo',
      },
      {
        name: 'Me multaron',
        key: 'Multa',
      },
      {
        name: 'Me suspendieron',
        key: 'Suspension',
      },
      {
        name: 'La tasa de aceptación cayó sin motivos',
        key: 'Tasa',
      },
      {
        name: 'Me robaron mientras trabajaba',
        key: 'Robo',
      },
      {
        name: 'Otros',
        key: 'Otros',
      },
    ];


    return (
      <Formik
        initialValues={{ firstname:'', lastname: '', email: '', phonenumber: '', city: '', seniority: '', tasks: '', companies: '', problems: '' }}
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
              label="Localidad"
              mode="outlined"
              value={values.city}
              onChangeText={handleChange('city')}
              placeholder="Ingrese la localidad"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="building"
                  size={12}
                  color="grey"
                />
              )}
            />
          <Text style={styles.formTitles}>Sobre tu trabajo</Text>
            <Input
              label="Antigüedad"
              mode="outlined"
              value={values.seniority}
              onChangeText={handleChange('seniority')}
              onBlur={handleBlur('seniority')}
              placeholder="Ingrese su antigüedad"
              labelStyle={styles.inputslabel}
              leftIcon={(
                <Icon
                  name="star"
                  size={12}
                  color="grey"
                />
              )}
            />
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
          <Select options={problems} label="Problema" />

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

Complaint.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  saveComplaint: (values) => {
    dispatch(setComplaint(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Complaint);
