import React from 'react';
import {
  View, Text, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import Select from '../form/Select';
import { setAlert } from '../../actions/alerts';
import styles from '../styles';

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .label('Descripcion')
    .min(2, 'La descripción debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  direction: yup
    .string()
    .label('Direccion')
    .min(2, 'La direccion debe tener más de ${min} caracteres')
    .required('Campo requerido'),
});

class AlertForm extends React.Component {
  constructor(props) {
    super(props);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }


  // FIXME userID
  onSubmit = (values) => {
    const { saveAlert } = this.props;
    saveAlert(values);
  }


  focusNextField(id) {
    this.inputs[id].focus();
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

    const types = [
      {
        name: 'Accidente',
        key: 'accidente',
      },
      {
        name: 'Choque',
        key: 'Choque',
      },
      {
        name: 'Problema con un local',
        key: 'Local',
      },
      {
        name: 'Problema de tránsito',
        key: 'Transito',
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
        initialValues={{ userId: 'fgt', description: '', direction: '' }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ name: '' }}
      >
        {({
          values, handleChange, isValid, setFieldValue, submitForm, errors, touched, handleBlur, handleSubmit,
        }) => (
          <ScrollView>
            <Select options={types} label="Tipo de alerta" setFieldValue={setFieldValue} />
            <Select options={companies} label="Empresa" setFieldValue={setFieldValue} />

            <Input
              label="Descripcion"
              mode="outlined"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              placeholder="Descripcion de la alerta"
              valid={touched.description && !errors.description}
              error={touched.description && errors.description}
              labelStyle={styles.inputslabel}
              returnKeyType="next"
              ref={(input) => {
                this.inputs.description = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('direction');
              }}
              blurOnSubmit={false}
            />
            {errors.description && touched.description ? (
              <Text style={styles.formError}>{errors.description}</Text>
            ) : null }
            <Input
              label="Dirección"
              mode="outlined"
              value={values.direction}
              onChangeText={handleChange('direction')}
              onBlur={handleBlur('direction')}
              placeholder="Dirección de la alerta"
              valid={touched.direction && !errors.direction}
              error={touched.direction && errors.direction}
              labelStyle={styles.inputslabel}
              returnKeyType="next"
              ref={(input) => {
                this.inputs.direction = input;
              }}
              onSubmitEditing={() => {
                submitForm();
              }}
              blurOnSubmit={false}
            />
            {errors.direction && touched.direction ? (
              <Text style={styles.formError}>{errors.direction}</Text>
            ) : null }
            <Button
              title="Guardar"
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

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  saveAlert: (values) => {
    dispatch(setAlert(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertForm);
