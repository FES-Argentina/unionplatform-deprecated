import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  ScrollView,
  Share,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationService from '../../navigation/NavigationService';

import styles from './styles';

import { fetchDocuments } from '../../actions/documents';

class Profile extends React.Component {
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

  itemView = () => {
    NavigationService.navigate('Complaints');
  }

  render() {
    const {
      id, name, avatar, subtitle, email, workemail, complaints,
    } = this.props;

    return (
      <SafeAreaView>
        <ScrollView>
        <Text style={styles.itemIDTitle}>ID</Text>
        <Text style={styles.itemID}>{id}</Text>
        <Text style={styles.itemID}>{name}</Text>
        <Text style={styles.itemSubTitle}>Empleado</Text>
        <Text style={styles.item}>{subtitle}</Text>
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
        <FlatList
          data={complaints.slice(0, 2)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={this.itemView}>
              <View style={styles.itemNameNotification}>
                <Text style={styles.complaintTitle}>Denuncia</Text>
                <Text style={styles.itemComplaint}>{item.id}</Text>
                <Text style={styles.complaintTitle}>Problemas</Text>
                <Text style={styles.itemComplaint}>{item.problems}</Text>
                <Text style={styles.complaintTitle}>Empresa</Text>
                <Text style={styles.itemComplaint}>{item.companies}</Text>
                <Text style={styles.complaintTitle}>Descripcion</Text>
                <Text style={styles.itemComplaint}>{item.summary}</Text>
                <Text style={styles.complaintTitle}>Fecha</Text>
                <Text style={styles.itemComplaint}>{item.date}</Text>
                <Button onPress={this.onShare} title="Compartir" />
              </View>
            </TouchableHighlight>
          )}
        />
    </ScrollView>

      </SafeAreaView>
    );
  }
}

Profile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
  workemail: PropTypes.string,
  complaints: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Profile.defaultProps = {
  id: '123ABC',
  name: 'Nombre Apellido',
  subtitle: 'Empresa',
  avatar: 'https://via.placeholder.com/600/56a8c2',
  email: 'mail@example.com',
  workemail: 'mail@example.com',
  complaints: [{
      id:	"CZffc",
      photo:	"https://via.placeholder.com/600/771796",
      summary: "Id amet ante dolor velit tempor magna tempor sed orci tortor ipsum consectetur",
      problems:	"Accidente",
      seniority:	"3 anios",
      city:	"CABA",
      tasks:	"Reparto",
      companies:	"Rappi",
      date: '2019/08/08'
    },
    {
      id:	"CZff2",
      photo:	"https://via.placeholder.com/600/771796",
      summary: "Id tempor sed orci tortor ipsum consectetur",
      problems:	"Robo",
      seniority:	"1 anio",
      city:	"CABA",
      tasks:	"Reparto",
      companies:	"Glovo",
      date: '2019/10/10'
    },
  ],
};

const mapStateToProps = (state) => ({
  data: state.documents.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
