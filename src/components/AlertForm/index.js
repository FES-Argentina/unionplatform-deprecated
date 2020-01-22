import React from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Select from '../form/Select';
import { setAlert } from '../../actions/alerts';
import styles from '../styles';

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .label('Descripcion')
    .min(2, 'La descripción debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  address: yup
    .string()
    .label('Direccion')
    .min(2, 'La direccion debe tener más de ${min} caracteres')
    .required('Campo requerido'),
});

class AlertForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
  }

  onSubmit = (values) => {
    const { saveAlert } = this.props;
    saveAlert(values);
  }


  focusNextField = (id) => {
    this.inputs[id].focus();
  }


  render() {
    // FIXME companies-problems values

    const companies = [
      {
        name: 'Cabify',
        key: 'cabify',
      },
      {
        name: 'Uber',
        key: 'uber',
      },
      {
        name: 'Glovo',
        key: 'glovo',
      },
      {
        name: 'Rappi',
        key: 'rappi',
      },
    ];

    const types = [
      {
        name: 'Accidente',
        key: 'accident',
      },
      {
        name: 'Choque',
        key: 'crash',
      },
      {
        name: 'Problema con un local',
        key: 'store',
      },
      {
        name: 'Problema de tránsito',
        key: 'traffic',
      },
      {
        name: 'Me robaron mientras trabajaba',
        key: 'theft',
      },
      {
        name: 'Otros',
        key: 'other',
      },
    ];


    return (
      <Formik
        initialValues={{ description: '', address: '' }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ name: '' }}
      >
        {({
          values, handleChange, isValid, setFieldValue, submitForm, errors, touched, handleBlur, handleSubmit,
        }) => (
          <ScrollView>
            <Select options={types} name="type" label="Tipo de alerta" setFieldValue={setFieldValue} />
            <Select options={companies} name="company" label="Empresa" setFieldValue={setFieldValue} />

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
                this.focusNextField('address');
              }}
              blurOnSubmit={false}
            />
            {errors.description && touched.description ? (
              <Text style={styles.formError}>{errors.description}</Text>
            ) : null }
            <Input
              label="Dirección"
              mode="outlined"
              value={values.address}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              placeholder="Dirección de la alerta"
              valid={touched.address && !errors.address}
              error={touched.address && errors.address}
              labelStyle={styles.inputslabel}
              returnKeyType="next"
              ref={(input) => {
                this.inputs.address = input;
              }}
              onSubmitEditing={() => {
                submitForm();
              }}
              blurOnSubmit={false}
            />
            {errors.address && touched.address ? (
              <Text style={styles.formError}>{errors.address}</Text>
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
