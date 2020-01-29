import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Field from '../Field';
import styles from '../styles';

class ComplaintDetail extends React.Component {


  render() {
    const { item } = this.props.navigation.state.params
    const { shareComplaint } = this.props;

    return (
      <ScrollView>
        <View style={styles.containerMargin}>
          <Text style={styles.titleNews}>{item.problems}</Text>
          <View>
            <Text style={styles.complaintTitles}>Detalle</Text>
            <Text style={styles.bodyDetail}>{item.description}</Text>
            <Field label="Fecha" value={item.date} />
            <Field label="Dirección" value={item.address} />
            <Field label="Empresa" value={item.company} />
            <Field label="ID de la denuncia" value={item.id} />
          </View>
          <View>
            <Text style={styles.complaintTitles}>Sobre el usuario</Text>
            <Field label="Nombre y apellido" value={`${item.firstname} ${item.lastname}`} />
            <Field label="Teléfono" value={item.phonenumber} />
            <Field label="Antigüedad" value={item.seniority} />
            <Field label="Tareas" value={item.tasks} />
          </View>
          <View>
            <Text style={styles.complaintTitles}>Archivos adjuntos</Text>
              <Image
                source={{ uri: item.photo }}
                style={styles.photoNews}
              />
          </View>
        </View>
      </ScrollView>
    );
  }
}

ComplaintDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ComplaintDetail;
