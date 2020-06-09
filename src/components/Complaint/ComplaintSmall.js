import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { getProblemLabel, getCompanyLabel } from '../../utils/values';
import NavigationService from '../../navigation/NavigationService';
import Field from '../Field';
import styles from '../styles';

class ComplaintSmall extends React.Component {
  itemView = (item) => {
    NavigationService.navigate('ComplaintDetail', {id: item.id} );
  }

  render() {
    const { item, onShare } = this.props;
    return (
      <TouchableHighlight onPress={() => this.itemView(item)} style={styles.complaintSmall}>
        <View>
          <Field label={getProblemLabel(item.problem)} value={`${item.date}, ${getCompanyLabel(item.company)}`} />
          <Button onPress={() => onShare(item)} title="Compartir" />
        </View>
      </TouchableHighlight>
    );
  }
}

ComplaintSmall.propTypes = {
  item: PropTypes.object.isRequired,
  onShare: PropTypes.func.isRequired,
};

export default ComplaintSmall;
