import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  View,
} from 'react-native';
import Checkbox from './Checkbox';

class CheckboxContainer extends React.Component {
  render() {
    const { checkboxes } = this.props;

    return (
      <View>
        {
          checkboxes.map((item) => (
            <TouchableHighlight key={item.key}>
              <Checkbox name={item.name} value={item.name} />
            </TouchableHighlight>
          ))
        }
      </View>
    );
  }
}

CheckboxContainer.propTypes = {
  checkboxes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CheckboxContainer;
