import {
  StyleSheet,
  Dimensions,
} from 'react-native';

export const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  // cardlist
  containerStandar: {
    marginTop: 20,
    flex: 1,
  },
  itemCardlist: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 200,
    backgroundColor: '#ff5252',
    width: width - 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.6,
    backgroundColor: 'black',
    width: width - 20,
    height: 200,
  },
  titleCardlist: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    padding: 15,
  },
  summaryCardlist: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    padding: 15,
  },
  // complaints
  formTitles: {
    fontSize: 24,
    alignSelf: 'flex-start',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    color: 'grey',
    fontWeight: 'bold',
  },
  inputs: {
    paddingTop: 20,
    marginTop: 20,
    paddingVertical: 10,
  },
  // login
  containers: {
    flex: 1,
    alignItems: 'center',
  },
  presentation: {
    fontSize: 40,
    alignSelf: 'center',
    paddingHorizontal: 10,
    color: '#f50057',
    fontWeight: 'bold',
    paddingVertical: 60,
  },
  // complaintSmall
  complaintSmall: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  // message
  titles: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  body: {
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  // generic & loadingIndicator
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // logout
  logout: {
    color: 'black',
    fontSize: 14,
  },
  logoutContainer: {
    justifyContent: 'flex-start',
    marginLeft: 15,
  },
  logoutIcon: {
    color: 'grey',
    marginRight: 35,
  },
  // news
  titleNews: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  summaryText: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  photoNews: {
    height: height,
    width: 'auto',
  },
  // onboarding
  photoOnboarding: {
    height: 200,
    width: 200,
  },
  // profile
  mailsProfile: {
    paddingTop: 20,
    flexDirection: 'row',
    paddingLeft: 15,
  },
  detailProfile: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  // simplelist
  imagesList: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  itemList: {
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
  titleList: {
    flex: 2,
    fontSize: 16,
    paddingRight: 15,
    paddingVertical: 10,
  },
});

export default styles;
