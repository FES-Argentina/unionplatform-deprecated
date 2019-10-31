import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainerGrid: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 200,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    opacity: 0.7,
  },
  itemTitleGrid: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    padding: 15,
  },
  itemNameGrid: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    padding: 15,
  },
});

export default styles;
