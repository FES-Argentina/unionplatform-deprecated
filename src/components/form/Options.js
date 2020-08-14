import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from '../styles';

class Options extends React.Component {
  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = { value: defaultValue };
  }

  updateValue = (key) => {
    let { value } = this.state;
    const { multiple, onChange } = this.props;
    if (multiple) {
      value = (value.includes(key)) ? value.filter((i) => i != key) : value.concat(key);
    }
    else {
      value = [key];
    }
    this.setState({ value });
    if (onChange) {
      onChange(value.sort());
    }
  }

  render() {
    const { label, items, multiple } = this.props;
    const icons = {
      checked: multiple ? 'check-square' : 'circle',
      unchecked: multiple ? 'square-o' : 'circle-o',
    };
    return (
      <View>
        <Text style={styles.formLabel}>{label}</Text>
        <View style={styles.checkboxesContainer}>
          {
            items.map((item) => (
              <CheckBox
                iconType="font-awesome"
                checkedIcon={icons.checked}
                checkedColor="#f50057"
                uncheckedIcon={icons.unchecked}
                key={item.key}
                title={item.name}
                checked={this.state.value.includes(item.key)}
                onPress={() => this.updateValue(item.key)}
                containerStyle={{
                  backgroundColor: 'none',
                  borderWidth: 0,
                }}
              />
            ))
          }
        </View>
      </View>
    )
  }
}

Options.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  multiple: PropTypes.boolean,
};

Options.defaultProps = {
  defaultValue: [],
  multiple: true,
};

export default Options;
