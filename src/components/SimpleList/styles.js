import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    padding: 15,
  },
  images: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  itemNameNotification: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#f8f8ff',
    fontWeight: '600',
    marginVertical: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleItem: {
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default styles;
