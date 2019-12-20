import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import styles from '../styles';

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    };
  }

  updateValue = async (itemValue) => {
    await this.setState({ selectedItems: itemValue });
    this.props.setFieldValue(this.props.label, this.state.selectedItems);
    console.warn(this.state.selectedItems);
  };

  render() {
    const { selectedItems } = this.state;
    const { items, label, setFieldValue } = this.props;

    return (
        <View>
          <Text style={styles.formTitles}>{label}</Text>
          <View style={{ flex: 1, paddingHorizontal: 10}}>
            <MultiSelect
              items={items}
              uniqueKey="id"
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
