import React from 'react';
import { Dimensions, View, TouchableOpacity, PermissionsAndroid, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { getAlerts } from '../../actions/alerts';
import { getAlertLabel } from '../../utils/values';
import { mapStyle } from '../../utils/defaults';
import styles from '../styles';
import Geolocation from 'react-native-geolocation-service';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationService from '../../navigation/NavigationService';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get('window');
const LATITUDE = -34.606856;
const LONGITUDE = -58.436293;
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const PIN_COLOURS = {
  accident: "red",
  crash: "orange",
  store: "yellow",
  traffic: "green",
  theft: "blue",
  other: "violet",
};

class Alerts extends React.Component {
  componentDidMount = () => {
    const { loadAlerts } = this.props;
    loadAlerts();
  }

  centerMap = (coords) => {
    if (this.map) {
      let region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.001,
      }
      this.map.animateToRegion(region, 800);
    }
  }

  requestPermission = async () => {
    const rationale = {
      title: 'Ubicación',
      message: 'Para poder mostrar tu ubicación en el mapa por favor dale acceso en la siguiente pantalla.',
      buttonPositive: 'Aceptar',
    };
    const access = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      rationale
    );
    return access === PermissionsAndroid.RESULTS.GRANTED
  }

  gotToMyLocation = async () => {
    if (await this.requestPermission()) {
      Geolocation.getCurrentPosition(
        ({ coords }) => this.centerMap(coords),
        (error) => Toast.show('No pudimos acceder a tu ubicación...', Toast.LONG),
        { enableHighAccuracy: true }
      );
    } else {
      Toast.show('Para mostrar tu ubicación actual necesitamos que aceptes el permiso.');
    }
  }
  addMarker = () => {
    NavigationService.navigate('AlertForm');
  }
  render() {
    const { alerts, colours } = this.props;
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          ref={(map) => { this.map = map; }}
          style={{ height: '100%', width: '100%' }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {alerts.map((marker) => (
            <Marker
              coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
              title={getAlertLabel(marker.type)}
              description={marker.description}
              flat={true}
              pinColor={colours[marker.type]}
            />
          ))}
        </MapView>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='crimson' title="Ubicación actual" onPress={() => this.gotToMyLocation()}>
            <Icon name="my-location" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='crimson' title="Agregar alerta" onPress={() => this.addMarker()}>
            <IconFontAwesome5 name="map-marker-alt" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.object),
  icons: PropTypes.objectOf(PropTypes.string),
  loadAlerts: PropTypes.func.isRequired,
};

Alerts.defaultProps = {
  alerts: [],
  colours: PIN_COLOURS,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadAlerts: () => dispatch(getAlerts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
