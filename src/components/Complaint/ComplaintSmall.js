import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import Field from '../Field';
import { createPdf } from '../../utils/pdf';
import { requestStoragePermission } from '../../utils/permissions';
import styles from '../styles';

class ComplaintSmall extends React.Component {
  itemView = () => {
    Alert.alert('Item view');
  }

  onShare = async () => {
    const { item } = this.props;
    const file = await createPdf(item);
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableHighlight onPress={this.itemView} style={styles.complaintSmall}>
        <View>
          <Field label="Denuncia" value={item.id} />
          <Field label="Problemas" value={item.problems} />
          <Field label="Empresa" value={item.companies} />
          <Field label="Descripcion" value={item.summary} />
          <Field label="Fecha" value={item.date} />
          <Button onPress={this.onShare} title="Compartir"/>
        </View>
      </TouchableHighlight>
    );
  }
}

ComplaintSmall.propTypes = {
  item: PropTypes.object,
};

export default ComplaintSmall;
