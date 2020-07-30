import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import SafeAreaViewDecider from '../SafeAreaViewDecider'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import styles from '../styles';
import ResponsiveImageView from 'react-native-responsive-image-view';

class NewsDetail extends React.Component {
  render() {
    const { item } = this.props.navigation.state.params

    return(
      <ScrollView>
        <SafeAreaViewDecider statusBarHiddenForNotch={true} statusBarHiddenForNonNotch={false} backgroundColor="crimson"/>
        <View style={styles.containerMargin}>
          <Text style={styles.titleNews}>{item.title}</Text>
          <Text style={styles.summaryText}>{item.summary}</Text>
          <ResponsiveImageView source={{ uri: item.image }}>
            {({ getViewProps, getImageProps }) => (
              <View {...getViewProps()}>
                <Image {...getImageProps()} />
              </View>
            )}
          </ResponsiveImageView>

          <Text style={styles.newsBody}>{item.body}</Text>
        </View>
      </ScrollView>
    );
  }
}

NewsDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default NewsDetail;
