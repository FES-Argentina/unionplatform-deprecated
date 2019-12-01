import React from 'react';
import { Alert, TouchableHighlight, View } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Field from '../Field';
import styles from '../styles';

class ComplaintSmall extends React.Component {
  itemView = () => {
    // TODO: Implement item view.
    Alert.alert('Item view');
  }

  render() {
    const { item, onShare } = this.props;
    return (
      <TouchableHighlight onPress={this.itemView} style={styles.complaintSmall}>
        <View>
          <Field label="Denuncia" value={item.id} />
          <Field label="Problemas" value={item.problems} />
          <Field label="Empresa" value={item.companies} />
          <Field label="Descripcion" value={item.summary} />
          <Field label="Fecha" value={item.date} />
          <Button onPress={() => onShare(this)} title="Compartir" />
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
