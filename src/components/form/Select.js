import React from 'react';
import PropTypes from 'prop-types';
import { Picker, Text, View } from 'react-native';

class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedValue: null,
    };
  }

  updateValue = (itemValue, itemIndex) => {
    this.setState({selectedValue: itemValue});
  };

  render() {
    const { options, label } = this.props;
    const { selectedValue } = this.state;

    return (
      <View>
        <Text>{label}</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={this.updateValue}
          prompt={label}
        >
          {options.map((item) => <Picker.Item label={item.name} value={item.key} />)}
        </Picker>
      </View>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;

