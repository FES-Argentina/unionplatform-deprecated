import React, { PureComponent } from 'react';
import {
  Text, View, TouchableHighlight, Image,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNews } from '../../actions/news';
import NavigationService from '../../navigation/NavigationService';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaViewDecider from '../SafeAreaViewDecider'

import styles from './styles';

class Slideshow extends PureComponent {
  componentDidMount = () => {
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  itemView = (id) => {
    NavigationService.navigate('NewsDetailGuest', {id} );
  }

  render() {
    const { data } = this.props;

    return (
      <View>
        <SafeAreaViewDecider statusBarHiddenForNotch={true} statusBarHiddenForNonNotch={false} backgroundColor="crimson"/>

        <SwiperFlatList
          horizontal
          showPagination
          data={data.slice(0, 5)}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.itemView(item.id)}>
              <View style={styles.slide}>
                <Image source={{ uri: item.image }} style={styles.itemPhoto}/>
                <Text style={styles.slideTextTitle}>Noticia</Text>
                <Text style={styles.slideText}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}





Slideshow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loadDocuments: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Slideshow.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  data: state.news.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(getNews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Slideshow);
