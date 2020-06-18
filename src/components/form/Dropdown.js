import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    const { items, name, setFieldValue, defaultValue } = this.props;
    this.state = {
      selectedValue: null || this.props.defaultValue,
    };
    this.props.setFieldValue(this.props.name, this.state.selectedValue);
    console.log(this.state.selectedValue)
  }

  updateValue = async (value) => {
    const { name } = this.props;
    await this.setState({ selectedValue: value });
    this.props.setFieldValue(name, this.state.selectedValue);
  };

  render() {
    const { items, label, setFieldValue } = this.props;
    const options = []
    items.map((item) =>
      options.push({label: item.name, value: item.key})
    )
    return (
      <View>
        <Text style={styles.formLabel}>{label}</Text>
        <RNPickerSelect
            onValueChange={(value) => this.updateValue(value)}
            placeholder={{
                label: 'Selecciona una '+ this.props.label,
                color: '#f50057'
            }}
            items={options}
            style={{
              inputAndroid: {
                color: 'black'
              },
            }}
            value={this.state.selectedValue}
        />
      </View>
    );
  };
};

export default Dropdown;
