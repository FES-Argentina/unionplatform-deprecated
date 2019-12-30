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
    .min(2, "El nombre debe tener más de ${min} caracteres")
    .required("Campo requerido"),
  lastname: yup
    .string()
    .label('Apellido')
    .min(2, "El apellido debe tener más de ${min} caracteres")
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
  city: yup
    .string()
    .label('Localidad')
    .min(4, "Ingrese un valor válido")
    .required("Campo requerido"),
  seniority: yup
    .number()
    .min(1, 'La antigüedad debe tener al menos ${min} caracter')
    .typeError('La antigüedad debe estar expresado en números')
    .positive('La antigüedad debe ser mayor a 0')
    .label('Antigüedad')
    .required("Campo requerido"),
  tasks: yup
    .string()
    .label('Tareas')
    .min(3, "Ingrese un valor válido")
    .required("Campo requerido"),
  companies: yup
    .boolean().oneOf([true], 'Por favor elegir al menos una'),
  problems: yup
    .boolean().oneOf([true], 'Por favor elegir al menos una')
});

class Complaint extends React.Component {
  constructor(props) {
    super(props);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }
  focusNextField(id) {
    this.inputs[id].focus();
  }
  onSubmit = (values) => {
    const { saveComplaint } = this.props;
    saveComplaint(values);
  }

  render() {
    // FIXME companies-problems values
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
        initialValues={{ firstname:'', lastname: '', email: '', phonenumber: '', city: '', seniority: '', tasks: ''}}
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
              valid={touched.firstname && !errors.firstname}
              error={touched.firstname && errors.firstname}
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
              valid={touched.lastname && !errors.lastname}
              error={touched.lastname && errors.lastname}
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
              valid={touched.email && !errors.email}
              error={touched.email && errors.email}
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
                this.focusNextField('city');
              }}
              blurOnSubmit={false}
              valid={touched.phonenumber && !errors.phonenumber}
              error={touched.phonenumber && errors.phonenumber}
            />
            {errors.phonenumber && touched.phonenumber ? (
                <Text style={styles.formError}>{errors.phonenumber}</Text>
            ) : null }
            <Input
              label="Localidad"
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
                this.focusNextField('seniority');
              }}
              blurOnSubmit={false}
              valid={touched.city && !errors.city}
              error={touched.city && errors.city}
            />
          {errors.city && touched.city ? (
                <Text style={styles.formError}>{errors.city}</Text>
            ) : null }
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
              returnKeyType="next"
              ref={ input => {
                this.inputs['seniority'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('tasks');
              }}
              blurOnSubmit={false}
              valid={touched.seniority && !errors.seniority}
              error={touched.seniority && errors.seniority}
            />
          {errors.seniority && touched.seniority ? (
                <Text style={styles.formError}>{errors.seniority}</Text>
            ) : null }
            <Select options={companies} label="Empresa" setFieldValue={setFieldValue}/>
            <Select options={problems} label="Problema" setFieldValue={setFieldValue}/>
            <Input
              label="Tareas"
              mode="outlined"
              value={values.tasks}
              onChangeText={handleChange('tasks')}
              onBlur={handleBlur('tasks')}
              placeholder="Ingrese las tareas que realiza"
              labelStyle={styles.inputslabel}
              valid={touched.tasks && !errors.tasks}
              error={touched.tasks && errors.tasks}
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
          {errors.tasks && touched.tasks ? (
                <Text style={styles.formError}>{errors.tasks}</Text>
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
