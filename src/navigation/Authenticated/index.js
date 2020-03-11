import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  createAppContainer,
} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation-drawer';
import {
  createStackNavigator,
} from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-elements';

import PropTypes from 'prop-types';
import styles from './styles';
import LogoutButton from '../../components/LogoutButton';

import Home from '../../components/Home';
import CardList from '../../components/CardList';
import NewsDetail from '../../components/NewsDetail';
import Complaint from '../../components/Complaint';
import AlertForm from '../../components/AlertForm';

import SimpleList from '../../components/SimpleList';
import DocumentDetail from '../../components/DocumentDetail';
import ComplaintDetail from '../../components/ComplaintDetail';
import Profile from '../../components/Profile';
import ProfileEdit from '../../components/ProfileEdit';
import Onboarding from '../../components/Onboarding';
import ComplaintList from '../../components/ComplaintList';
import TermsAndConditions from '../../components/TermsAndConditions';

class NavigationDrawerStructure extends React.Component {
  render() {
    const { navigationProps } = this.props;
    return (
      <SafeAreaView
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View >
          <TouchableOpacity onPress={navigationProps.toggleDrawer}>
            <FontAwesome5 name="bars" style={styles.bars} size={22} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const TabStackNavigator = createStackNavigator({
  TabFirst: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Sindicato App',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
  TabSecond: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Sindicato App',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
  TabThird: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Sindicato App',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const ProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Perfil',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <>
          <Button
            title="Editar"
            onPress={() => { navigation.navigate('ProfileEdit'); }}
            type="clear"
            titleStyle={{ color: 'white' }}
          />
        </>
      ),
    }),
  },
  ProfileEdit: {
    screen: ProfileEdit,
    navigationOptions: ({ navigation }) => ({
      title: 'Editar datos de perfil',
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const ComplaintsStackNavigator = createStackNavigator({
  Complaints: {
    screen: Complaint,
    navigationOptions: ({ navigation }) => ({
      title: 'Cargar denuncia',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  }
});

const ComplaintListStackNavigator = createStackNavigator({
  ComplaintList: {
    screen: ComplaintList,
    navigationOptions: ({ navigation }) => ({
      title: 'Mis denuncias',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
  ComplaintDetail: {
    screen: ComplaintDetail,
    navigationOptions: ({ navigation }) => ({
      title: 'Denuncia',
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const ListStackNavigator = createStackNavigator({
  CardList: {
    screen: CardList,
    navigationOptions: ({ navigation }) => ({
      title: 'Noticias',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
  NewsDetail: {
    screen: NewsDetail,
    navigationOptions: ({ navigation }) => ({
      title: 'Noticia',
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const DocListStackNavigator = createStackNavigator({
  SimpleList: {
    screen: SimpleList,
    navigationOptions: ({ navigation }) => ({
      title: 'Documentos',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
  DocumentDetail: {
    screen: DocumentDetail,
    navigationOptions: ({ navigation }) => ({
      title: 'Documento',
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const OnboardingStackNavigator = createStackNavigator({
  Onboarding: {
    screen: Onboarding,
    navigationOptions: ({ navigation }) => ({
      title: 'Ayuda',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const AlertFormStackNavigator = createStackNavigator({
  AlertForm: {
    screen: AlertForm,
    navigationOptions: ({ navigation }) => ({
      title: 'Nueva alerta',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

const TermsStackNavigator = createStackNavigator({
  TermsAndConditions: {
    screen: TermsAndConditions,
    navigationOptions: ({ navigation }) => ({
      title: 'Términos y condiciones',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#f50057',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  }
});

const DrawerNavigator = createDrawerNavigator({
  Tabs: {
    screen: TabStackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: () => (
        <FontAwesome5 name="home" size={15} />
      ),
    },
  },

  Profile: {
    screen: ProfileStackNavigator,
    navigationOptions: {
      drawerLabel: 'Perfil',
      drawerIcon: () => (
        <FontAwesome5 name="user-ninja" solid size={15} />
      ),
    },
  },

  Complaints: {
    screen: ComplaintsStackNavigator,
    navigationOptions: {
      drawerLabel: 'Cargar denuncia',
      drawerIcon: () => (
        <FontAwesome5 name="burn" solid size={15} />
      ),
    },
  },

  ComplaintList: {
    screen: ComplaintListStackNavigator,
    navigationOptions: {
      drawerLabel: 'Mis denuncias',
      drawerIcon: () => (
        <FontAwesome5 name="burn" solid size={15} />
      ),
    },
  },

  CardList: {
    screen: ListStackNavigator,
    navigationOptions: {
      drawerLabel: 'Noticias',
      drawerIcon: () => (
        <FontAwesome5 name="flag" solid size={15} />
      ),
    },
  },

  SimpleList: {
    screen: DocListStackNavigator,
    navigationOptions: {
      drawerLabel: 'Documentos',
      drawerIcon: () => (
        <FontAwesome5 name="file" solid size={15} />
      ),
    },
  },

  AlertForm: {
    screen: AlertFormStackNavigator,
    navigationOptions: {
      drawerLabel: 'Cargar alerta',
      drawerIcon: () => (
        <FontAwesome5 name="map" size={15} />
      ),
    },
  },
  
  Onboarding: {
    screen: OnboardingStackNavigator,
    navigationOptions: {
      drawerLabel: 'Ayuda',
      drawerIcon: () => (
        <FontAwesome5 name="question" solid size={15} />
      ),
    },
  },

  TermsAndConditions: {
    screen: TermsStackNavigator,
    navigationOptions: {
      drawerLabel: 'Términos y condiciones',
      drawerIcon: () => (
        <FontAwesome5 name="question" solid size={15} />
      ),
    },
  },

},
{
  contentComponent: (props) => (
    <SafeAreaView forceInset={{ horizontal: 'never' }} style={{ flex: 1 }}>
      <Image source={require('../../assets/images/app.jpg')} style={styles.itemPhoto}/>
      <ScrollView>
        <DrawerItems {...props} />
        <LogoutButton />
      </ScrollView>
      <View>
        <Image source={require('../../assets/images/fes.jpg')} style={styles.footerLogo}/>
      </View>
    </SafeAreaView>
  ),
});

NavigationDrawerStructure.propTypes = {
  navigationProps: PropTypes.object.isRequired,
};

CardList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SimpleList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const nav = createAppContainer(DrawerNavigator);

export default nav;
