import React, { PureComponent } from 'react';
import {
  Text, View,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './styles';

export default class Slideshow extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={2}
          showPagination
        >
          <View style={styles.child1}>
            <Text style={styles.text}>1</Text>
          </View>
          <View style={styles.child2}>
            <Text style={styles.text}>2</Text>
          </View>
          <View style={styles.child3}>
            <Text style={styles.text}>3</Text>
          </View>
          <View style={styles.child}>
            <Text style={styles.text}>4</Text>
          </View>
        </SwiperFlatList>
      </View>
    );
  }
}
