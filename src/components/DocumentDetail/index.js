import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import styles from '../styles';

class DocumentDetail extends React.Component {
  linkDownload = (uri) => {
    Linking.openURL(uri).catch((err) => Toast.show('No se pudo abrir el archivo.', Toast.LONG));
  }

  render() {
    const { title, description, file } = this.props.navigation.state.params.item;

    return (
      <ScrollView>
        <View style={styles.containerMargin}>
          <Text style={styles.titleNews}>{title}</Text>
          <Text style={styles.summaryText}>{description}</Text>
          {file ? <Button onPress={() => this.linkDownload(file)} title="Descargar"/> : null }
        </View>
      </ScrollView>
    );
  }
}

DocumentDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default DocumentDetail;
