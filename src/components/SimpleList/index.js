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
import styles from '../styles';
import SafeAreaViewDecider from '../SafeAreaViewDecider'
import EmptyListMessage from '../EmptyListMessage';

import { getDocuments } from '../../actions/documents';

class SimpleList extends React.Component {
  componentDidMount = () => {
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  itemView = (item) => {
    NavigationService.navigate('DocumentDetail', {item} );
  }

  render() {
    const { data } = this.props;

    return (
      <SafeAreaView>
        <SafeAreaViewDecider statusBarHiddenForNotch={true} statusBarHiddenForNonNotch={false} backgroundColor="crimson"/>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.itemView(item)}>
              <View style={styles.itemList}>
                <Text style={styles.titleList}>{item.title}</Text>
                {item.image &&
                  <Image source={{ uri: item.image }} style={styles.imagesList} />
                }
              </View>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<EmptyListMessage text="No hay documentos..." />}
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
