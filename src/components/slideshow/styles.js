import {
  StyleSheet,
  Dimensions,
} from 'react-native';

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  child: {
    height: height * 1,
    width,
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  child1: {
    height: height * 1,
    width,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  child2: {
    height: height * 1,
    width,
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  child3: {
    height: height * 1,
    width,
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },

});

export default styles;
