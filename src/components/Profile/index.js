import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationService from '../../navigation/NavigationService';

import styles from './styles';

import { fetchDocuments } from '../../actions/documents';

class Profile extends React.Component {
  componentDidMount = () => {
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  itemView = () => {
    NavigationService.navigate('Complaints');
  }

  render() {
    const {
      id, name, avatar, subtitle, email, workemail, data,
    } = this.props;

    return (
      <SafeAreaView>
        <Text style={styles.itemIDTitle}>ID</Text>
        <Text style={styles.itemID}>{id}</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{name}</Text>
          <Image
            source={{ uri: avatar }}
            style={styles.images}
          />
        </View>
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
        <Text style={styles.Complaint}>Ultimas denuncias</Text>
        <FlatList
          data={data.slice(0, 2)}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={this.itemView}>
              <View style={styles.itemNameNotification}>
                <Text style={styles.itemComplaint}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
    );
  }
}

Profile.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
  workemail: PropTypes.string,
  loadDocuments: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Profile.defaultProps = {
  data: [],
  id: '123123',
  name: 'Juana Gomez',
  subtitle: 'Empresa',
  avatar: 'https://via.placeholder.com/600/56a8c2',
  email: 'example@gmail.com',
  workemail: 'example@gmail.com',
};

const mapStateToProps = (state) => ({
  data: state.documents.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
