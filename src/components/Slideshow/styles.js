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
    justifyContent: 'flex-start',
  },
  slideText: {
    fontSize: 18,
    textAlign: 'left',
    paddingHorizontal: 30,
  },
  slideTextTitle: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  itemPhoto: {
    height: 400,
    width: 'auto',
  },
});

export default styles;
