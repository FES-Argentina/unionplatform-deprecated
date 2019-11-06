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
  slide: {
    flexDirection: 'column',
    height: height * 1,
    width,
    justifyContent: 'center',
  },
  slideText: {
    fontSize: 18,
    textAlign: 'center',
  },
  slideTextTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
});

export default styles;
