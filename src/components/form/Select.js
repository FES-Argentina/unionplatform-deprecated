import React from 'react';
import PropTypes from 'prop-types';
import { Picker, Text, View } from 'react-native';
import styles from '../styles';

class Select extends React.Component {
  constructor(props) {
    super(props);
    const { name, options } = this.props;
    this.state = {
      selectedValue: options[0].name,
    };
    this.props.setFieldValue(name, this.state.selectedValue);
  }

  updateValue = async (itemValue) => {
    const { name } = this.props;
    await this.setState({ selectedValue: itemValue });
    this.props.setFieldValue(name, this.state.selectedValue);
  };


  render() {
    const { options, label, setFieldValue } = this.props;
    const { selectedValue } = this.state;

    return (
      <View>
        <Text style={styles.formTitles}>{label}</Text>
        <Picker
          style={styles.inputs}
          prompt={label}
          selectedValue={this.state.selectedValue}
          onValueChange={this.updateValue}
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
