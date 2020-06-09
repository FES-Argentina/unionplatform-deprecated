import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import ResponsiveImageView from 'react-native-responsive-image-view';
import Share from 'react-native-share';
import {
  getProblemLabel,
  getCompanyLabel,
  getSeniorityLabel
} from '../../utils/values';
import Field from '../Field';
import styles from '../styles';
import { createPdf } from '../../utils/pdf';
import { processing } from '../../actions';
import { getComplaintImages } from '../../actions/user';

class ComplaintDetail extends React.Component {

  componentDidMount() {
    const { item, downloadImages } = this.props;
    downloadImages(item);
  }

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
    const { item } = this.props;

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
          { item.localImages.length ? (
            <FlatList
              data={item.localImages}
              keyExtractor={(index) => item.localImages[index]}
              renderItem={({ index }) => (
                <View>
                  <Text style={styles.complaintTitles}>Archivo adjunto { index + 1 }</Text>
                  <ResponsiveImageView source={{ uri: `file://${item.localImages[index]}` }}>
                    {({ getViewProps, getImageProps }) => (
                      <View {...getViewProps()}>
                        <Image {...getImageProps()} />
                      </View>
                    )}
                  </ResponsiveImageView>
                </View>
              )}
            />
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

const mapStateToProps = (state, ownProps) => ({
  item: state.user.complaints.find((x) => x.id === ownProps.navigation.state.params.id),
});


const mapDispatchToProps = (dispatch) => ({
  downloadImages: (complaint) => dispatch(getComplaintImages(complaint)),
  showProcessing: (status) => dispatch(processing(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintDetail);
