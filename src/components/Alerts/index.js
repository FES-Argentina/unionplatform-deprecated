import React from 'react';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAlerts } from '../../actions/alerts';
import { getAlertLabel } from '../../utils/values';
import styles from '../styles';
import Geolocation from '@react-native-community/geolocation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
  gotToMyLocation = () => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
          console.log("curent location: ", coords)
          if (this.map) {
            console.log("curent location: ", coords)
            let region = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.001
          }
            this.map.animateToRegion(
              region, 800 )
          }
        },
        (error) => alert('¿Tenés activados los servicios de ubicación?'),
        { enableHighAccuracy: true }
    );
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
        <TouchableOpacity onPress={this.gotToMyLocation} style={{
            width: 60, height: 60,
            position: "absolute", bottom: 20, right: 20, borderRadius: 30, backgroundColor: "crimson"
          }}>
            <FontAwesome5
                name="map-marker-alt" size={25} color={'white'} style={{
                    position: "absolute", bottom: 17, right: 20
                  }}
            />
      </TouchableOpacity>
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
