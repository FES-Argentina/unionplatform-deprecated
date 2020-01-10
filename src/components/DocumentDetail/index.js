import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Share
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import styles from '../styles';

class DocumentDetail extends React.Component {

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Sindicato APP',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert('On share');
        } else {
          Alert.alert('On share else');
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert('On share dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  linkDownload = (uri) => {
     //console.warn(uri)
  RNFetchBlob
    .config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache : true,
    })
    .fetch('GET', uri, {
      //some headers ..
    })
    .then((res) => {
      // the temp file path
      console.warn('The file saved to ', res.path())
    })
  }

  render() {
    const { item, title, description, uri } = this.props.navigation.state.params.item;

    return (
      <ScrollView>
        <View style={styles.containerMargin}>
          <Text style={styles.titleNews}>{title}</Text>
          <Text style={styles.summaryText}>{description}</Text>

          <Text style={styles.link} onPress={() => this.linkDownload(uri)}>
            {title}
          </Text>
        <Button onPress={this.onShare} title="Compartir"/>
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
