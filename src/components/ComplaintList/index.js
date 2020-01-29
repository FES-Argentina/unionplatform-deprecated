import React from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationService from '../../navigation/NavigationService';
import { createPdf } from '../../utils/pdf';
import Share from 'react-native-share';
import { processing } from '../../actions';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from '../styles';

import { getComplaints } from '../../actions/user';

class ComplaintList extends React.Component {
  componentDidMount = () => {
    const { loadComplaints } = this.props;
    loadComplaints();
  }

  itemView = (item) => {
    NavigationService.navigate('ComplaintDetail', {item} );
  }

  shareComplaint = async (item) => {
    const { showProcessing } = this.props;
    try {
      const { showProcessing } = this.props;
      const file = await createPdf(item);
      if (file.filePath) {
        Share.open({
          title: 'Compartir denuncia',
          url: `file://${file.filePath}`,
          subject: `[SindicAPP] Denuncia ${item.id}`,
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
    const { data, shareComplaint } = this.props;

    return (
      <SafeAreaView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <View style={styles.complaints}>
                  <TouchableHighlight onPress={() => this.itemView(item)}>
                  <View style={styles.complaintslist}>
                    <Text style={styles.titleDetail}>{item.problem}</Text>
                    <Text style={styles.dateDetail}>{item.date}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.shareComplaint(item)}>
                  <FontAwesome5 name="share" size={20} style={styles.downloadIcon}/>
                </TouchableHighlight>
              </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

ComplaintList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loadComplaints: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ComplaintList.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  data: state.user.complaints,
});

const mapDispatchToProps = (dispatch) => ({
  loadComplaints: () => dispatch(getComplaints()),
  showProcessing: (status) => dispatch(processing(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintList);
