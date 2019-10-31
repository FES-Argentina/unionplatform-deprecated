import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

import { fetchDocuments } from '../../actions/documents';

class Profile extends React.Component {
  componentDidMount = () => {
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  render() {
    const {
      id, name, avatar, subtitle, email, workemail,
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
  loadDocuments: PropTypes.func.isRequired,
};

Profile.defaultProps = {
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
