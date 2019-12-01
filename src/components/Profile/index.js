import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getUser } from '../../actions/user';

import NavigationService from '../../navigation/NavigationService';
import ComplaintSmall from '../Complaint/ComplaintSmall';
import Share from 'react-native-share';
import { createPdf } from '../../utils/pdf';

import styles from '../styles';

class Profile extends React.Component {
  componentDidMount = () => {
    const { loadUser } = this.props;
    //FIX id user
    loadUser('IhK');
  }

  shareComplaint = async (item) => {
    const file = await createPdf(item);
    if (file.filePath) {
      Share.open({
        title: 'Compartir denuncia',
        url: `file://${file.filePath}`,
        subject: `[SindicAPP] Denuncia ${item.id}`,
        message: 'Denuncia reportada a través de SindicAPP.',
      });
    }
  }

  render() {
    if (!this.props.data.id) {
      return null;
    }

    const {
      id, email, workemail, complaints, companies
    } = this.props.data;

    return (
        <ScrollView>
          <SafeAreaView style={styles.containerStandar}>
          <Text style={styles.titleNews}>ID</Text>
          <Text style={styles.summaryText}>{id}</Text>
          <Text style={styles.detailProfile}>Empresa</Text>
          <View style={styles.summaryText}>
              {companies.map((item) =>
                <Text>
                  {item}
                </Text>
              )}
          </View>
          <View style={styles.mailsProfile}>
            <FontAwesome5 name="envelope" solid size={15} style={styles.iconProfile} />
            <Text style={styles.detailProfile}>Personal</Text>
          </View>
          <Text style={styles.summaryText}>{email}</Text>
          <View style={styles.mailsProfile}>
            <FontAwesome5 name="envelope" solid size={15} style={styles.iconProfile} />
            <Text style={styles.detailProfile}>Trabajo</Text>
          </View>
          <Text style={styles.summaryText}>{workemail}</Text>
          <Text style={styles.detailProfile}>Últimas denuncias</Text>
            {
              complaints.slice(0, 2).map((item) => <ComplaintSmall item={item} onShare={this.shareComplaint} />)
            }
          </SafeAreaView>
        </ScrollView>
    );
  }
}

Profile.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  workemail: PropTypes.string,
  companies: PropTypes.arrayOf(PropTypes.string),
  complaints: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Profile.defaultProps = {
  "firstname": "rutrum",
  "lastname": "dolor",
  "id": "123123",
  "email": "SDeskins@gilla.org",
  "workemail": "asdas@frina.org",
  "username": "COwlett",
  "pass": "zDMM5mrp",
  "complaints": [
    {
      "id": "dQ",
      "photo": "https://via.placeholder.com/600/771796",
      "summary": "Id amet ante dolor velit tempor magna tempor sed orci tortor ipsum consectetur",
      "firstname": "ohnk",
      "lastname": "sit",
      "email": "JPoer@velit.io",
      "username": "WRamsey",
      "phonenumber": "15326489",
      "city": "CABA",
      "seniority": "3 meses",
      "companies": [
        "Rappi",
        "Glovo"
      ],
      "problems": "Accidente con la bicicleta",
      "date": "2019/08/08"
    },
    {
      "id": "dQ",
      "photo": "https://via.placeholder.com/600/771796",
      "summary": "Id amet ante dolor velit tempor magna tempor sed orci tortor ipsum consectetur",
      "firstname": "ohnk",
      "lastname": "sit",
      "email": "JPoer@velit.io",
      "username": "WRamsey",
      "phonenumber": "15326489",
      "city": "CABA",
      "seniority": "6 meses",
      "companies": [
        "Rappi",
        "Glovo"
      ],
      "problems": "Accidente con la bicicleta",
      "date": "2019/10/08"
    }
  ]
};


const mapStateToProps = (state) => ({
  data: state.user.item,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: (id) => dispatch(getUser(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
