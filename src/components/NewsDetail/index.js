import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNew } from '../../actions/news';
import { Alert } from 'react-native';

import styles from '../styles';

class NewsDetail extends React.Component {
  componentDidMount = () => {
    const { loadDocument } = this.props;
    loadDocument(this.props.navigation.state.params.id);
  }

  onShare = () => {
    Alert.alert('On share');
  }

  render() {
    const { data } = this.props;

    return (
      <ScrollView>
        <View style={styles.containerStandar}>
          <Text style={styles.titleNews}>{data.title}</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
          <Image
            source={{ uri: data.photo }}
            style={styles.photoNews}
          />
        <Button onPress={this.onShare} title="Compartir"/>
        </View>
      </ScrollView>
    );
  }
}

NewsDetail.propTypes = {
  data: PropTypes.object,
  loadDocument: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

NewsDetail.defaultProps = {
  data: {},
};

const mapStateToProps = (state) => ({
  data: state.news.item,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocument: (id) => dispatch(getNew(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
