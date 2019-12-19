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
import { setAlert } from '../../actions/alerts';
import PropTypes from 'prop-types';
import styles from '../styles';

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .label('Descripcion'),
  direction: yup
    .string()
    .label('Direccion'),
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
        initialErrors={{ direction: '' }}
      >
        {({
          values, handleChange, handleBlur, handleSubmit, isValid, setFieldValue, submitForm
        }) => (
          <ScrollView>
            <Select options={types} label="Tipo de alerta" setFieldValue={setFieldValue}/>
            <Select options={companies} label="Empresa" setFieldValue={setFieldValue}/>

              <Input
                label="Descripcion"
                mode="outlined"
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                placeholder="Descripcion de la alerta"
                labelStyle={styles.inputslabel}
                returnKeyType="next"
                ref={ input => {
                  this.inputs['description'] = input;
                }}
                onSubmitEditing={() => {
                  this.focusNextField('direction');
                }}
                blurOnSubmit={false}

              />

              <Input
                label="Direccion"
                mode="outlined"
                value={values.direction}
                onChangeText={handleChange('direction')}
                placeholder="Ingrese la ubicacion"
                labelStyle={styles.inputslabel}
                blurOnSubmit={false}
                returnKeyType="done"
                ref={ (input) => {
                  this.inputs['direction'] = input;
                }}
                onSubmitEditing={() => {
                  submitForm();
                }}
              />

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
