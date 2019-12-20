import React from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Selector from '../form/Selector';

import styles from '../styles';

import { updateUserAction } from '../../actions/user';


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label('Alias')
    .required(),
  email: yup
    .string()
    .label('E-mail personal')
    .email(),
  workemail: yup
    .string()
    .label('E-mail del trabajo')
    .email(),
});

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }
  focusNextField(id) {
    this.inputs[id].focus();
  }
  onSubmit = (values) => {
    const { id } = values;

    const { onUpdateUserAction } = this.props;
    onUpdateUserAction(id, values);
  }


  render() {
    const items = [
      { id: 'Cabify', name: 'Cabify' },
      { id: 'Uber', name: 'Uber' },
      { id: 'Glovo', name: 'Glovo' },
      { id: 'Rappi', name: 'Rappi' },
    ];


    // FIXME: user id value
    return (
      <Formik
        initialValues={{
           workemail: '', email: '', username: '', id: 'efd',
        }}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
        initialErrors={{ name: '' }}
      >
        {({
          values, handleChange, isValid, setFieldValue, submitForm
        }) => (
          <ScrollView>
            <Selector items={items} label="Empresa" setFieldValue={setFieldValue}/>
            <Text style={styles.formTitles}>Perfil</Text>

            <Input
              label="Alias"
              mode="outlined"
              value={values.username}
              onChangeText={handleChange('username')}
              placeholder="Alias"
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
                this.inputs['username'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('email');
              }}
              blurOnSubmit={false}
            />

            <Input
              label="Email personal"
              mode="outlined"
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="Email"
              labelStyle={styles.inputslabel}
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              leftIcon={(
                <Icon
                  name="envelope"
                  size={12}
                  color="grey"
                />
              )}
              ref={(input) => {
                this.inputs['email'] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField('workemail');
              }}
              blurOnSubmit={false}
            />
            <Input
              label="Email del trabajo"
              mode="outlined"
              value={values.workemail}
              onChangeText={handleChange('workemail')}
              placeholder="Email"
              labelStyle={styles.inputslabel}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="done"
              leftIcon={(
                <Icon
                  name="envelope"
                  size={12}
                  color="grey"
                />
              )}
              ref={(input) => {
                this.inputs['workemail'] = input;
              }}
              onSubmitEditing={() => {
                submitForm();
              }}
              blurOnSubmit={false}
            />


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

ProfileEdit.propTypes = {
  onUpdateUserAction: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  onUpdateUserAction: (id, newValues) => {
    dispatch(updateUserAction(id, newValues));
  },
});


const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
