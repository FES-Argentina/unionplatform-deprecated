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
import { getComplaints, getUser } from '../../actions/user';
import { processing } from '../../actions';
import NavigationService from '../../navigation/NavigationService';
import ComplaintSmall from '../Complaint/ComplaintSmall';
import { createPdf } from '../../utils/pdf';
import { getCompanyLabel } from '../../utils/values';
import Field from '../Field';
import Address from '../Address';
import styles from '../styles';

class Profile extends React.Component {
  componentDidMount = () => {
    const { loadComplaints, loadUser, id } = this.props;
    loadUser(id);
    loadComplaints();
  }

  shareComplaint = async (item) => {
    const { showProcessing, imageCache } = this.props;
    try {
      showProcessing(true);
      const file = await createPdf(item, imageCache);
      if (file.filePath) {
        Share.open({
          title: 'Compartir denuncia',
          url: `file://${file.filePath}`,
          subject: 'Mi denuncia en SindicAPP',
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
    const { profile, complaints } = this.props;

    const fullname = (profile.firstname && profile.lastname) ? `${profile.firstname} ${profile.lastname}` : '-';
    const date = moment(new Date(profile.created));
    let birthdate = moment.utc(new Date(profile.birthdate));
    let companies = (profile.companies) ? profile.companies.map(getCompanyLabel).join(', ') : 'N/D';

    return (
        <ScrollView>
          <SafeAreaView style={styles.containerStandar}>
            <Text style={styles.profileName}>{fullname}</Text>
            <Field label="Usuarix" value={profile.username} />
            <Field label="Miembrx desde" value={date.format('DD/MM/YYYY')} />
            <Field label="Correo electrónico" value={profile.mail} />
            <Field label="CUIT" value={profile.cuit} />
            <Field label="DNI" value={profile.dni} />
            <Field label="Teléfono" value={profile.phonenumber} />
            <Field label="Fecha de nacimiento" value={birthdate.format('DD/MM/YYYY')} />
            <Field label="Nacionalidad" value={profile.nationality} />

            <Text style={styles.titlesDetail}>Dirección</Text>
            <View style={styles.profileAddress}>
              <Address
                address={profile.address}
                city={profile.city}
                province={profile.province}
                postalcode={profile.postalcode}
                country={profile.country}
              />
            </View>

            <Field label="Empresa" value={companies} />
            <Field label="Tareas" value={profile.tasks} />

            <Text style={styles.titleNews}>Últimas denuncias</Text>
            {complaints && complaints.length ?
              complaints.slice(0,2).map((item) => <ComplaintSmall complaintId={item.id} onShare={this.shareComplaint} />)
                : <Text style={styles.bodyDetail}>No hay denuncias</Text>
            }

          </SafeAreaView>
        </ScrollView>
    );
  }
}

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    companies: PropTypes.array.isRequired,
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
  profile: state.user.profile,
  complaints: state.user.complaints,
  imageCache: state.image.cache,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: (id) => dispatch(getUser(id)),
  loadComplaints: () => dispatch(getComplaints()),
  showProcessing: (status) => dispatch(processing(status)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
