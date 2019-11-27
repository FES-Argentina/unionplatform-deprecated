import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Share,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { fetchUser } from '../../actions/user';

import NavigationService from '../../navigation/NavigationService';
import ComplaintSmall from '../Complaint/ComplaintSmall';

import styles from './styles';

class Profile extends React.Component {
  componentDidMount = () => {
    const { loadUser } = this.props;
    //FIX id user
    const data = loadUser('IhK');
  }


  onShare = async () => {
    try {
      const result = await Share.share({
        message:
            'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {
      id, username, firstname, email, workemail, complaints
    } = this.props.data;

    return (
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.itemIDTitle}>ID</Text>
          <Text style={styles.itemID}>{id}</Text>
          <Text style={styles.itemSubTitle}>Empleado</Text>
          <Text style={styles.item}>{username}</Text>
          <View style={styles.itemContainerData}>
            <FontAwesome5 name="envelope" solid size={15} style={styles.icon} />
            <Text style={styles.itemSubTitleText}>Personal</Text>
          </View>
          <Text style={styles.itemSubTitle}>{email}</Text>
          <View style={styles.itemContainerData}>
            <FontAwesome5 name="envelope" solid size={15} style={styles.icon} />
            <Text style={styles.itemSubTitleText}>Trabajo</Text>
          </View>
          <Text style={styles.itemSubTitle}>{workemail}</Text>
          <Text style={styles.complaint}>Ultimas denuncias</Text>
            {
              complaints.slice(0, 2).map((item) => <ComplaintSmall item={item} />)
            }
        </ScrollView>
      </SafeAreaView>
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
  loadUser: (id) => dispatch(fetchUser(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
