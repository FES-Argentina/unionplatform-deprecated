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
    const { onChange } = this.props;
    value = (value.includes(key)) ? value.filter((i) => i != key) : value.concat(key);
    this.setState({ value });
    if (onChange) {
      onChange(value.sort());
    }
  }

  render() {
    const { label, items } = this.props;
    return (
      <View>
        <Text style={styles.formLabel}>{label}</Text>
        <View style={styles.checkboxesContainer}>
          {
            items.map((item) => (
              <CheckBox
                iconType="font-awesome"
                checkedIcon="check-square"
                checkedColor="#f50057"
                uncheckedIcon="square"
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
};

Options.defaultProps = {
  defaultValue: [],
};

export default Options;
