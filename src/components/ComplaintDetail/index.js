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
import { Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { getProblemLabel, getCompanyLabel, getSeniorityLabel } from '../../utils/values';
import { createPdf } from '../../utils/pdf';
import Share from 'react-native-share';
import { processing } from '../../actions';

class ComplaintDetail extends React.Component {

  shareComplaint = async (item) => {
    const { showProcessing } = this.props;
    try {
      showProcessing(true);
      const file = await createPdf(item);
      if (file.filePath) {
        Share.open({
          title: 'Compartir denuncia',
          url: `file://${file.filePath}`,
          subject: 'Mi denuncia en SindicAPP',
          message: 'Denuncia reportada a través de SindicAPP.',
        });
      }
    } catch (e) {
      console.warn('ERROR', e);
    } finally {
      showProcessing(false);
    }
  }


  render() {
    const { item } = this.props.navigation.state.params
    const { shareComplaint } = this.props;

    return (
      <ScrollView>
        <View style={styles.containerMargin}>
          <Text style={styles.titleNews}>{getProblemLabel(item.problem)}</Text>
          <View>
            <Text style={styles.complaintTitles}>Detalle</Text>
            <Text style={styles.bodyDetail}>{item.description}</Text>
            <Field label="Fecha" value={item.date} />
            <Field label="Dirección" value={item.address} />
            <Field label="Empresa" value={getCompanyLabel(item.company)} />
            <Field label="ID de la denuncia" value={item.id} />
          </View>
          <View>
            <Text style={styles.complaintTitles}>Sobre el usuario</Text>
            <Field label="Nombre y apellido" value={`${item.firstname} ${item.lastname}`} />
            <Field label="Teléfono" value={item.phonenumber} />
            <Field label="Antigüedad" value={getSeniorityLabel(item.seniority)} />
            <Field label="Tareas" value={item.tasks} />
          </View>
          {item.photo ? (
            <View>
              <Text style={styles.complaintTitles}>Archivos adjuntos</Text>
              <Image
                source={{ uri: item.photo }}
                style={styles.photoNews}
              />
            </View>
          ) : null }
          <Button
            title="Compartir denuncia"
            type="outline"
            iconRight
            titleStyle={{ color: '#f50057', marginRight: 15}}
            onPress={() => this.shareComplaint(item)}
            icon={
              <FontAwesome5
                  name="share" solid size={15}
              />
            }
          />
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

const mapStateToProps = (state) => ({
});


const mapDispatchToProps = (dispatch) => ({
  loadComplaints: () => dispatch(getComplaints()),
  showProcessing: (status) => dispatch(processing(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintDetail);
