import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';

class ComplaintDetail extends React.Component {


  render() {
    const { id, firstname, lastname, email, photo, summary, phonenumber, city, seniority, problems, date, company, tasks } = this.props.navigation.state.params.item;
    const { shareComplaint } = this.props;

    return (
      <ScrollView>
        <View style={styles.containerMargin}>
          <Text style={styles.titleNews}>{problems}</Text>
          <View>
            <Text style={styles.complaintTitles}>Detalle</Text>
            <Text style={styles.bodyDetail}>{summary}</Text>
            <Text style={styles.titlesDetail}>Fecha</Text>
            <Text style={styles.bodyDetail}>{date}</Text>
            <Text style={styles.titlesDetail}>Ciudad</Text>
            <Text style={styles.bodyDetail}>{city}</Text>
            <Text style={styles.titlesDetail}>Empresa</Text>
            <Text style={styles.bodyDetail}>{company}</Text>
            <Text style={styles.titlesDetail}>ID de la denuncia</Text>
            <Text style={styles.bodyDetail}>{id}</Text>
          </View>
          <View>
            <Text style={styles.complaintTitles}>Sobre el usuario</Text>
            <Text style={styles.titlesDetail}>Nombre y apellido</Text>
            <Text style={styles.bodyDetail}>{firstname} {lastname}</Text>
            <Text style={styles.titlesDetail}>Teléfono</Text>
            <Text style={styles.bodyDetail}>{phonenumber}</Text>
            <Text style={styles.titlesDetail}>Antiguedad</Text>
            <Text style={styles.bodyDetail}>{seniority}</Text>
            <Text style={styles.titlesDetail}>Tareas</Text>
            <Text style={styles.bodyDetail}>{tasks}</Text>
          </View>
          <View>
            <Text style={styles.complaintTitles}>Archivos adjuntos</Text>
              <Image
                source={{ uri: photo }}
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
