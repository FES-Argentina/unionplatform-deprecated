import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import NavigationService from '../../navigation/NavigationService';
import styles from '../styles';
import SafeAreaViewDecider from '../SafeAreaViewDecider';
import EmptyListMessage from '../EmptyListMessage';
import {getDocuments} from '../../actions/documents';

class SimpleList extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.state = {
      loading: false,
      isRefreshing: false,
    };
  }

  componentDidMount = page => {
    const {loadDocuments} = this.props;
    loadDocuments(this.page);
  };

  itemView = item => {
    NavigationService.navigate('DocumentDetail', {item});
  };

  handleLoadMore = () => {
    if (!this.state.loading) {
      this.page = this.page + 1;
      const {loadDocuments} = this.props;
      loadDocuments(this.page);
      this.setState({isRefreshing: false, loading: false});
    }
  };

  _renderItem = ({item, separators}) => {
    return (
      <TouchableHighlight
        onPress={() => this.itemView(item)}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}>
        <View style={styles.itemList}>
          <Text
            style={styles.titleList}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {item.title}
          </Text>
          {item.image && (
            <Image source={{uri: item.image}} style={styles.imagesList} />
          )}
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { data } = this.props;

    return (
      <SafeAreaView>
        <SafeAreaViewDecider
          statusBarHiddenForNotch={true}
          statusBarHiddenForNonNotch={false}
          backgroundColor="crimson"
        />
        <FlatList
          refreshing={this.state.isRefreshing}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReachedThreshold={0.4}
          onEndReached={this.handleLoadMore.bind(this)}
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

const mapStateToProps = state => ({
  data: state.documents.list,
});

const mapDispatchToProps = dispatch => ({
  loadDocuments: page => dispatch(getDocuments(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SimpleList);
