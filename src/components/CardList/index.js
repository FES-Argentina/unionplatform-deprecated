import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNews } from '../../actions/news';
import NavigationService from '../../navigation/NavigationService';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaViewDecider from '../SafeAreaViewDecider'
import EmptyListMessage from '../EmptyListMessage';
import styles from '../styles';

class CardList extends React.Component {
  componentDidMount = () => {
    const { loadNews } = this.props;
    loadNews();
  }

  itemView = (item) => {
    this.props.navigation.navigate("NewsDetail" , {item});
  }

  _loadOlder = () => {
    const { loadNews, loading, data } = this.props;
    if (!loading) {
      const offset = data.length;
      loadNews(offset);
    }
  }

  render() {
    const { data } = this.props;

    return (
      <>
        <SafeAreaViewDecider statusBarHiddenForNotch={true} statusBarHiddenForNonNotch={false} backgroundColor="crimson"/>
        <FlatGrid
          itemDimension={300}
          items={data}
          style={styles.containerStandar}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.itemView(item)}>
              <View style={styles.itemCardlist}>
                <ImageBackground style={styles.backgroundImage} source={{ uri: item.image }}>
                  <LinearGradient colors={["#ffffff00", "black"]} style={styles.containerOverlay}>
                  <Text style={styles.titleCardlist} numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
                  <Text style={styles.summaryCardlist} numberOfLines={2} ellipsizeMode={'tail'}>{item.summary}</Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<EmptyListMessage text="No hay noticias..." />}
          onEndReachedThreshold={0.1}
          onEndReached={this._loadOlder}
        />
      </>
    );
  }
}

CardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

CardList.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  data: state.news.list,
  loading: state.news.loading,
});

const mapDispatchToProps = (dispatch) => ({
  loadNews: (offset = 0) => dispatch(getNews(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
