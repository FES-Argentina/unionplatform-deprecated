import React from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationService from '../../navigation/NavigationService';
import styles from './styles';

import { getDocuments } from '../../actions/documents';

class SimpleList extends React.Component {
  componentDidMount = () => {
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  itemView = (id) => {
    NavigationService.navigate('NewsDetail', {id} );
  }

  render() {
    const { data } = this.props;

    return (
      <SafeAreaView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.itemView(item.id)}>
              <View style={styles.itemNameNotification}>
                <Text style={styles.titleItem}>{item.title}</Text>
                <Image
                  source={{ uri: item.photo }}
                  style={styles.images}
                />
              </View>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
    );
  }
}

SimpleList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loadDocuments: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SimpleList.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  data: state.documents.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(getDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleList);
