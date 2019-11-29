import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { getDocument } from '../../actions/documents';
import { Alert } from 'react-native';

import styles from '../styles';

class DocumentDetail extends React.Component {
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

DocumentDetail.propTypes = {
  data: PropTypes.object,
  loadDocument: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

DocumentDetail.defaultProps = {
  data: {},
};

const mapStateToProps = (state) => ({
  data: state.documents.item,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocument: (id) => dispatch(getDocument(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);
