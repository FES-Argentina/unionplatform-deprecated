import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
} from 'react-native';
import Pagination from 'react-native-pagination';
import _ from 'lodash';
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
    this.state = {
      data: this.props.data,
    };
  }

  componentDidMount = () => {
    const {loadDocuments} = this.props;
    loadDocuments();
    const {data} = this.props;
  };

  itemView = item => {
    NavigationService.navigate('DocumentDetail', {item});
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    this.setState({viewableItems});
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
    return (
      <SafeAreaView>
        <SafeAreaViewDecider
          statusBarHiddenForNotch={true}
          statusBarHiddenForNonNotch={false}
          backgroundColor="crimson"
        />
        <FlatList
          ref={r => (this.refs = r)}
          //horizontal
          onViewableItemsChanged={this.onViewableItemsChanged}
          pagingEnabled
          data={this.state.data}
          renderItem={this._renderItem}
        />
        <Pagination
          textStyle={{fontSize: 14}}
          dotThemeDark
          paginationStyle={styles.pagination}
          dotSwapAxis
          dotEmptyHide
          dotIconHide
          startDotIconSize={35}
          listRef={this.refs}
          paginationVisibleItems={this.state.viewableItems}
          paginationItems={this.state.data}
          paginationItemPadSize={1}
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
  loadDocuments: () => dispatch(getDocuments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SimpleList);
