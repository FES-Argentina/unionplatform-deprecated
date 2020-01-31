import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Share from 'react-native-share';
import moment from 'moment';
import { getUser } from '../../actions/user';
import { processing } from '../../actions';
import NavigationService from '../../navigation/NavigationService';
import ComplaintSmall from '../Complaint/ComplaintSmall';
import { createPdf } from '../../utils/pdf';
import Field from '../Field';
import Address from '../Address';

import styles from '../styles';

class Profile extends React.Component {
  componentDidMount = () => {
    const { loadUser, id } = this.props;
    loadUser(id);
  }

  shareComplaint = async (item) => {
    const { showProcessing } = this.props;
    try {
      showProcessing(true);
      const file = await createPdf(item);
      if (file.filePath) {
        Share.open({
          title: 'Compartir denuncia',
          url: `file://${file.filePath}`,
          subject: `[SindicAPP] Denuncia ${item.id}`,
          message: 'Denuncia reportada a través de SindicAPP.',
        });
      }
    } catch (e) {
      console.log('ERROR', e);
    } finally {
      showProcessing(false);
    }
  }

  render() {
    if (!this.props.id) {
      return null;
    }

    const { data } = this.props;
    const fullname = (data.firstname && data.lastname) ? `${data.firstname} ${data.lastname}` : '-';
    const date = moment(new Date(data.created));
    var birthdate = moment.utc(new Date(data.birthdate));

    return (
        <ScrollView>
          <SafeAreaView style={styles.containerStandar}>
            <Text style={styles.profileName}>{fullname}</Text>
            <Field label="Usuarix" value={data.username} />
            <Field label="Miembrx desde" value={date.format('DD/MM/YYYY')} />
            <Field label="Correo electrónico" value={data.mail} />
            <Field label="CUIT" value={data.cuit} />
            <Field label="DNI" value={data.dni} />
            <Field label="Teléfono" value={data.phonenumber} />
            <Field label="Fecha de nacimiento" value={birthdate.format('DD/MM/YYYY')} />
            <Field label="Nacionalidad" value={data.nationality} />

            <Text style={styles.titlesDetail}>Dirección</Text>
            <View style={styles.profileAddress}>
              <Address
                address={data.address}
                city={data.city}
                province={data.province}
                postalcode={data.postalcode}
                country={data.country}
              />
            </View>

            <Field label="Empresa" value={data.companies.join(', ')} />
            <Field label="Tareas" value={data.tasks} />

          </SafeAreaView>
        </ScrollView>
    );
  }
}

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    companies: PropTypes.string.isRequired,
    created: PropTypes.string,
    birthdate: PropTypes.string,
    mail: PropTypes.string,
    cuit: PropTypes.string,
    dni: PropTypes.string,
    phonenumber: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    postalcode: PropTypes.string,
    country: PropTypes.string,
    tasks: PropTypes.string,
    nationality: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  id: state.user.id,
  data: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: (id) => dispatch(getUser(id)),
  showProcessing: (status) => dispatch(processing(status)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
