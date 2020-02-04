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
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  itemView = (id) => {
    NavigationService.navigate('NewsDetail', {id} );
  }

  render() {
    const { data } = this.props;

    return (
      <ScrollView>
        <SafeAreaViewDecider statusBarHiddenForNotch={true} statusBarHiddenForNonNotch={false} backgroundColor="crimson"/>

      <FlatGrid
        itemDimension={300}
        items={data}
        style={styles.containerStandar}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => this.itemView(item.id)}>
            <View style={styles.itemCardlist}>
              <ImageBackground style={styles.backgroundImage} source={{ uri: item.photo }}>
                <LinearGradient colors={["#ffffff00", "black"]} style={styles.containerOverlay}>
                <Text style={styles.titleCardlist}>{item.title}</Text>
                <Text style={styles.summaryCardlist}>{item.summary}</Text>
                </LinearGradient>
              </ImageBackground>
            </View>
          </TouchableHighlight>
        )}
        ListEmptyComponent={<EmptyListMessage text="No hay noticias..." />}
      />
  </ScrollView>

    );
  }
}

CardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loadDocuments: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

CardList.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  data: state.news.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(getNews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
