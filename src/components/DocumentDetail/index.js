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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
          {file ?
            <Button
              title="Descargar documento"
              iconRight
              titleStyle={{ marginRight: 10}}
              onPress={() => this.linkDownload(file)}
              icon={
                <FontAwesome5
                    name="download" size={15} color={"white"}
                />
              }
            />
           : null }
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
