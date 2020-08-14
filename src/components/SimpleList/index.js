import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationService from '../../navigation/NavigationService';
import styles from '../styles';
import SafeAreaViewDecider from '../SafeAreaViewDecider';
import EmptyListMessage from '../EmptyListMessage';
import { getDocuments } from '../../actions/documents';

class SimpleList extends React.Component {
  componentDidMount() {
    const { loadDocuments } = this.props;
    loadDocuments();
  };

  _loadOlder = () => {
    const { loading, data, loadDocuments } = this.props;
    if (!loading) {
      const offset = data.length;
      loadDocuments(offset);
    }
  }

  itemView = item => {
    NavigationService.navigate('DocumentDetail', {item});
  };

  render() {
    const { data, loading, loadDocuments } = this.props;

    return (
      <SafeAreaView>
        <SafeAreaViewDecider statusBarHiddenForNotch={true} statusBarHiddenForNonNotch={false} backgroundColor="crimson" />
        <FlatList
          data={data}
          renderItem={({item, separators}) => (
            <TouchableHighlight
              onPress={() => this.itemView(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.itemList}>
                <Text style={styles.titleList} numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.1}
          onEndReached={this._loadOlder}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadDocuments}
              colors={['#f50057']}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

SimpleList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SimpleList.defaultProps = {
  data: [],
};

const mapStateToProps = state => ({
  data: state.documents.list,
  loading: state.documents.loading,
});

const mapDispatchToProps = dispatch => ({
  loadDocuments: (offset = 0) => dispatch(getDocuments(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleList);
