import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from '../styles';

class Address extends React.Component {
  render() {
    const { address, city, province, postalcode, country } = this.props;

    return (
      <View>
        <Text>{address}</Text>
        <View style={styles.addressCity}>
          {city ? <Text>{city}</Text> : null}
          {postalcode ? <Text> ({postalcode})</Text> : null}
          {province ? <Text>, {province}</Text> : null}
        </View>
        {country ? <Text>{country}</Text> : null}
      </View>
    );
  }
}

Address.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  province: PropTypes.string,
  postalcode: PropTypes.string,
  country: PropTypes.string,
};

export default Address;
