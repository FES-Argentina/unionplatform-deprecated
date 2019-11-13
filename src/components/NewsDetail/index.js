import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDocument } from '../../actions/documents';
import styles from './styles';

class NewsDetail extends React.Component {
  componentDidMount = () => {
    const { loadDocument } = this.props;
    loadDocument(this.props.navigation.state.params.id);
  }

  render() {
    const { data } = this.props;

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.itemTitle}>{data.title}</Text>
          <Text style={styles.itemName}>{data.summary}</Text>
          <Image
            source={{ uri: data.photo }}
            style={styles.itemPhoto}
          />
        </View>
      </SafeAreaView>
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
  data: state.documents.item,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocument: (id) => dispatch(fetchDocument(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
