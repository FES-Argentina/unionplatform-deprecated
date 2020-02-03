import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import styles from '../styles';

export default class Selector extends Component {
  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = {
      selectedItems: (defaultValue) ? defaultValue : [],
    };
  }

  updateValue = async (itemValue) => {
    await this.setState({ selectedItems: itemValue });
    const { name } = this.props;
    this.props.setFieldValue(name, itemValue);
  };

  render() {
    const { selectedItems } = this.state;
    const { items, label } = this.props;

    return (
        <View>
          <Text style={styles.formTitles}>{label}</Text>
          <View style={{ flex: 1, paddingHorizontal: 10}}>
            <MultiSelect
              items={items}
              uniqueKey="key"
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={this.updateValue}
              selectedItems={selectedItems}
              selectText="Seleccionar"
              searchInputPlaceholderText="Ingresa el valor..."
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#48d22b"
              submitButtonText="Guardar"
            />
          </View>
        </View>
    );
  }
}
