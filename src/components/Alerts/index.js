import React from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAlerts } from '../../actions/alerts';
import styles from '../styles';

const { height, width } = Dimensions.get('window');
const LATITUDE = -34.606856;
const LONGITUDE = -58.436293;
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

class Alerts extends React.Component {
  componentDidMount = () => {
    const { loadAlerts } = this.props;
    loadAlerts();
  }

  render() {
    const { alerts } = this.props;
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {alerts.map((marker) => (
            <Marker
              coordinate={{ latitude: marker.lat, longitude: marker.lon }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.object),
  loadAlerts: PropTypes.func.isRequired,
};

Alerts.defaultProps = {
  alerts: [],
};

const mapStateToProps = (state) => ({
  alerts: state.alerts.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadAlerts: () => dispatch(getAlerts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
