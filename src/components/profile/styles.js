import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  itemID: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  itemIDTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },
  itemSubTitle: {
    fontSize: 18,
    paddingHorizontal: 30,
  },
  itemSubTitleText: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 16,
    paddingLeft: 30,
  },
  images: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  itemContainerData: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  icon: {
    paddingLeft: 30,
  },
});

export default styles;
