import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button, Input, CheckBox} from 'react-native-elements';
import Options from '../form/Options';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setComplaint} from '../../actions/user';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import styles from '../styles';
import {
  companies,
  problemTypes,
  seniorities,
  getKeys,
} from '../../utils/values';
import {defaultProfile} from '../../utils/defaults';
import ImagePicker from 'react-native-image-picker';

const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .label('Nombre')
    .min(2, 'El nombre debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  lastname: yup
    .string()
    .label('Apellido')
    .min(2, 'El apellido debe tener más de ${min} caracteres')
    .required('Campo requerido'),
  mail: yup
    .string()
    .label('E-mail')
    .email('Ingrese un email válido')
    .required('Campo requerido'),
  phonenumber: yup
    .string()
    .label('Teléfono')
    .required('Campo requerido'),
  address: yup
    .string()
    .label('Localidad')
    .min(4, 'Ingrese un valor válido')
    .required('Campo requerido'),
  tasks: yup
    .string()
    .label('Tareas')
    .min(3, 'Ingrese un valor válido')
    .required('Campo requerido'),
  seniorities: yup.string().isRequired,
  companies: yup.string().isRequired,
  problems: yup.string().isRequired,
});

class Complaint extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.arrayPhoto = []

    this.state = {
      photo: null,
    };
  }

  focusNextField = id => {
    this.inputs[id].focus();
  };

  onSubmit = (values) => {
    const { saveComplaint } = this.props;
    if (this.state.photo) {
      values['photo'] = this.state.photo;
    }
    saveComplaint(values);
    this.setState({
      photo: null
    });
    this.arrayPhoto = []
  };


  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 2000,
      maxHeight: 2000,
      noData: true,
      title: 'Adjuntar imagen',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar fotografía',
      chooseFromLibraryButtonTitle: 'Elegir fotografía',
      mediaType: 'photo',
    };

    if (this.state.photo) {
      options.customButtons = [{ name: 'remove', title: 'Eliminar adjuntos' }];
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        Toast.show('No se pudo abrir el selector de imágenes.', Toast.LONG);
      } else if (response.customButton && response.customButton == 'remove') {
        this.setState({
          photo: null
        });
        this.arrayPhoto = []
      } else if (!response.didCancel) {
        let data = [{
          uri: response.uri,
          filename: response.fileName,
        }]
        this.arrayPhoto.push(data)
        this.setState({
          photo: this.arrayPhoto
        });
      }
    });
  }

  render() {
    const { profile } = this.props;
    return (
      <Formik
        initialValues={profile}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{name: '', uri: ''}}>
        {({
          values,
          handleChange,
          isValid,
          setFieldValue,
          submitForm,
          errors,
          touched,
          handleBlur,
          handleSubmit,
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
              leftIcon={<Icon name="user" size={12} color="grey" />}
              returnKeyType="next"
              ref={input => {
                this.inputs['firstname'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('lastname');
              }}
              blurOnSubmit={false}
            />
            {errors.firstname && touched.firstname ? (
              <Text style={styles.formErrorMessage}>{errors.firstname}</Text>
            ) : null}

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
              leftIcon={<Icon name="user" size={12} color="grey" />}
              returnKeyType="next"
              ref={input => {
                this.inputs['lastname'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('mail');
              }}
              blurOnSubmit={false}
            />
            {errors.lastname && touched.lastname ? (
              <Text style={styles.formErrorMessage}>{errors.lastname}</Text>
            ) : null}

            <Input
              label="E-mail"
              mode="outlined"
              value={values.mail}
              onChangeText={handleChange('mail')}
              onBlur={handleBlur('mail')}
              placeholder="Ingrese su e-mail"
              valid={touched.mail && !errors.mail}
              error={touched.mail && errors.mail}
              labelStyle={styles.inputslabel}
              leftIcon={<Icon name="envelope" size={12} color="grey" />}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              ref={input => {
                this.inputs['mail'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('phonenumber');
              }}
              blurOnSubmit={false}
            />
            {errors.mail && touched.mail ? (
              <Text style={styles.formErrorMessage}>{errors.mail}</Text>
            ) : null}

            <Input
              label="Teléfono"
              mode="outlined"
              value={values.phonenumber}
              onChangeText={handleChange('phonenumber')}
              onBlur={handleBlur('phonenumber')}
              placeholder="Ingrese su teléfono"
              labelStyle={styles.inputslabel}
              leftIcon={<Icon name="phone" size={12} color="grey" />}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              ref={input => {
                this.inputs['phonenumber'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('address');
              }}
              blurOnSubmit={false}
              valid={touched.phonenumber && !errors.phonenumber}
              error={touched.phonenumber && errors.phonenumber}
            />
            {errors.phonenumber && touched.phonenumber ? (
              <Text style={styles.formErrorMessage}>{errors.phonenumber}</Text>
            ) : null}

            <Input
              label="Dirección"
              mode="outlined"
              value={values.address}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              placeholder="Ingrese dirección"
              labelStyle={styles.inputslabel}
              leftIcon={<Icon name="address-card" size={12} color="grey" />}
              returnKeyType="next"
              ref={input => {
                this.inputs['address'] = input;
              }}
              blurOnSubmit={false}
              valid={touched.address && !errors.address}
              error={touched.address && errors.address}
            />
            {errors.address && touched.address ? (
              <Text style={styles.formErrorMessage}>{errors.address}</Text>
            ) : null}

            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View
                style={[
                  styles.photo,
                  styles.photoContainer,
                  {marginBottom: 20},
                ]}>
                {this.state.photo === null ? (
                  <Text style={styles.media}>Adjuntar imagen</Text>
                ) : (
                  <Image style={styles.photo} source={{ uri: this.state.photo[0][0].uri }} />
                )}
              </View>
            </TouchableOpacity>

            {this.state.photo && this.state.photo[0][0] ? (
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View
                  style={[
                    styles.photo,
                    styles.photoContainer,
                    {marginBottom: 20},
                  ]}>
                  {this.state.photo.length >= 0 && !this.state['photo'][1] ? (
                    <Text style={styles.media}>Adjuntar otra imagen</Text>
                  ) : (
                    <Image style={styles.photo} source={{ uri: this.state['photo'][1][0].uri }} />
                  )}
                </View>
              </TouchableOpacity>
            ) : null}

            { this.state.photo && this.state['photo'][1] ? (
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View
                  style={[
                    styles.photo,
                    styles.photoContainer,
                    {marginBottom: 20},
                  ]}>
                  {this.state.photo.length >= 1 && !this.state['photo'][2] ? (
                    <Text style={styles.media}>Adjuntar otra imagen</Text>
                  ) : (
                    <Image style={styles.photo} source={{ uri: this.state['photo'][2][0].uri }} />
                  )}
                </View>
              </TouchableOpacity>
            ) : null}

            <Text style={styles.formTitles}>Sobre tu trabajo</Text>
            <Options
              label="Empresa"
              items={companies.filter((i) => profile.companies.includes(i.key))}
              onChange={(v) => setFieldValue('company', v[0])}
              defaultValue={profile.companies.length == 1 ? profile.companies : []}
              multiple={false}
            />
            <Options
              label="Antigüedad"
              items={seniorities}
              onChange={(v) => setFieldValue('seniority', v[0])}
              multiple={false}
            />
            <Options
              label="Problema"
              items={problemTypes}
              onChange={(v) => setFieldValue('problem', v[0])}
              multiple={false}
            />

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
              leftIcon={<Icon name="tasks" size={12} color="grey" />}
              returnKeyType="next"
              ref={input => {
                this.inputs['tasks'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('description');
              }}
              blurOnSubmit={false}
            />
            {errors.tasks && touched.tasks ? (
              <Text style={styles.formErrorMessage}>{errors.tasks}</Text>
            ) : null}

            <Input
              label="Observaciones"
              mode="outlined"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              placeholder="Ingrese las observaciones necesarias"
              labelStyle={styles.inputslabel}
              valid={touched.description && !errors.description}
              error={touched.description && errors.description}
              returnKeyType="done"
              ref={input => {
                this.inputs['description'] = input;
              }}
              onSubmitEditing={() => {
                submitForm();
              }}
              blurOnSubmit={false}
            />
            {errors.description && touched.description ? (
              <Text style={styles.formErrorMessage}>{errors.description}</Text>
            ) : null}



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

const mapStateToProps = state => ({
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  saveComplaint: values => {
    dispatch(setComplaint(values));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Complaint);
