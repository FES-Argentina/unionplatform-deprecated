import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import MapPicker from 'react-native-map-picker';
import Select from '../form/Select';
import Options from '../form/Options';
import { setAlert } from '../../actions/alerts';
import styles from '../styles';
import { companies, alertTypes } from '../../utils/values';

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .label('Descripción')
    .min(2, 'La descripción debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  location: yup
    .object()
    .label('Ubicación')
    .required('Por favor seleccioná la ubicación'),
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
    const { profile } = this.props;
    return (
      <Formik
        initialValues={{ description: '' }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ name: '' }}
      >
        {({
          values, handleChange, isValid, setFieldValue, submitForm, errors, touched, handleBlur, handleSubmit,
        }) => (
          <ScrollView>
            <View style={{flex: 1, height: 400}}>
              <MapPicker
                buttonText="Seleccionar ubicación"
                onLocationSelect={({latitude, longitude}) => {
                  setFieldValue('location', {latitude, longitude});
                }}
                minZoomLevel={0}
              />
            </View>
            <Select options={alertTypes} name="type" label="Tipo de alerta" setFieldValue={setFieldValue} />
            <Options
              label="Empresa"
              items={companies.filter((i) => profile.companies.includes(i.key))}
              onChange={(v) => setFieldValue('company', v[0])}
              defaultValue={profile.companies.length == 1 ? profile.companies : []}
              multiple={false}
            />

            <Input
              label="Descripción"
              mode="outlined"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              placeholder="Descripción de la alerta"
              valid={touched.description && !errors.description}
              error={touched.description && errors.description}
              labelStyle={styles.inputslabel}
              returnKeyType="done"
              ref={(input) => {
                this.inputs.description = input;
              }}
              onSubmitEditing={() => {
                submitForm();
              }}
              blurOnSubmit={false}
            />
            {errors.description && touched.description ? (
              <Text style={styles.formErrorMessage}>{errors.description}</Text>
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
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  saveAlert: (values) => {
    dispatch(setAlert(values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertForm);
