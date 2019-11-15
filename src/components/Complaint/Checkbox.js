import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';


const Checkbox = ({ name, checked = false }) => (
  <CheckBox
    name={name}
    title={name}
    checked={checked}
    value={name}
    //onPress={() => setFieldValue('check',!checked)}
    />
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}

export default Checkbox;
