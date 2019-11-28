import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  // cardlist
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainerGrid: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 200,
    backgroundColor: '#ff5252',
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
  // complaint
  text: {
    fontSize: 24,
    alignSelf: 'flex-start',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    color: 'grey',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
  },
  // complaint & form
  complaintSmall: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  itemNameNotification: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  // Field
  label: {
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingRight: 30,
  },
  value: {
    paddingLeft: 30,
    paddingBottom: 10,
    paddingRight: 30,
  },
  // generic
  containerGeneric: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGeneric: {
    fontSize: 16,
  },
  itemPhoto: {
    height: 200,
    width: 200,
  },
  // homeScreen
  containerHome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHome: {
    fontSize: 16,
  },
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // loading
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // login
  containerLogin: {
    flex: 100,
  },
  textLogin: {
    fontSize: 16,
  },
  homeScreenLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // logout
  buttonLogout: {
    color: 'black',
  },

  // message
  message: {
  },
  title: {
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  // news
  containerNews: {
    flex: 1,
  },
  itemTitleNews: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },
  itemNameNews: {
    fontSize: 16,
    padding: 15,
  },
  itemPhotoNews: {
    height: 200,
    width: 'auto',
  },
  // onboarding
  containerOnboarding: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOnboarding: {
    fontSize: 16,
  },
  itemPhotoOnboarding: {
    height: 200,
    width: 200,
  },
  // profile
  itemContainerProfile: {
    marginVertical: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  itemIDProfile: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  itemIDTitleProfile: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  itemTitleProfile: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },
  itemSubTitleProfile: {
    fontSize: 18,
    paddingHorizontal: 30,
  },
  itemSubTitleTextProfile: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  itemProfile: {
    fontSize: 16,
    paddingLeft: 30,
  },
  imagesProfile: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  itemContainerDataProfile: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  iconProfile: {
    paddingLeft: 30,
  },
  ComplaintProfile: {
    paddingTop: 40,
    paddingLeft: 30,
    fontWeight: 'bold',
    fontSize: 16,

  },
  itemComplaintProfile: {
    paddingLeft: 30,
    paddingBottom: 10,
    paddingRight: 30,

  },
  complaintProfile: {
    paddingLeft: 30,
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 30,
    paddingRight: 30,

  },
  complaintTitleProfile: {
    paddingLeft: 30,
    fontWeight: 'bold',
    paddingRight: 30,

  },
  complaintDateProfile: {
    paddingLeft: 30,
    fontWeight: 'bold',
    color: 'grey',
    paddingRight: 30,

  },
  itemComplaintDateProfile: {
    paddingLeft: 30,
    paddingBottom: 10,
    color: 'grey',
    paddingRight: 30,

  },
  itemNameNotificationProfile: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  // edit profile
  homeScreenEditProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // simplelist
  itemTitleList: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    padding: 15,
  },
  imagesList: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  itemNameNotificationList: {
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
  titleItemList: {
    fontSize: 16,
    alignSelf: 'center',
  },

});

export default styles;
