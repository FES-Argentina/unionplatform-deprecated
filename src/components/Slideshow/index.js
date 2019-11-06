import React, { PureComponent } from 'react';
import {
  Text, View, TouchableHighlight, ImageBackground,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDocuments } from '../../actions/documents';
import NavigationService from '../../navigation/NavigationService';

import styles from './styles';

class Slideshow extends PureComponent {
  componentDidMount = () => {
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  itemView = () => {
    NavigationService.navigate('Complaints');
  }

  render() {
    const { data } = this.props;

    return (
      <View>
        <SwiperFlatList
          horizontal
          autoplay
          autoplayDelay={2}
          autoplayLoop
          showPagination
          data={data.slice(0, 5)}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={this.itemView}>
              <View style={styles.slide}>
                <ImageBackground style={styles.backgroundImage} source={{ uri: item.photo }}>
                  <Text style={styles.slideTextTitle}>Noticia</Text>
                  <Text style={styles.slideText}>{item.title}</Text>
                </ImageBackground>
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
  data: state.documents.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Slideshow);
