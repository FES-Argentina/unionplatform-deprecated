import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import {
  FlatList,
  TouchableHighlight,
} from 'react-native';

class CheckboxContainer extends React.Component {

  render() {
    const { checkboxes } = this.props;

    return (
      <FlatList
        data={checkboxes}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableHighlight>
              <Checkbox name={item.name} value={item.name} />
          </TouchableHighlight>
        )}
      />
    );
  }
}

export default CheckboxContainer;
