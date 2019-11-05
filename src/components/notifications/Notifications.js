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
import NavigationService from '../../navigation/navigationService';
import styles from './styles';

import { fetchDocuments } from '../../actions/documents';

class Notifications extends React.Component {
  componentDidMount = () => {
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  itemView = () => {
    NavigationService.navigate('Complaints');
  }

  render() {
    const { data } = this.props;

    return (
      <SafeAreaView>
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={this.itemView}>
              <View style={styles.itemNameNotification}>
                <Text style={styles.titleItem}>{item.title}</Text>
                <Image
                  source={{ uri: item.photo }}
                  style={styles.images}
                />
              </View>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
    );
  }
}

Notifications.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loadDocuments: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Notifications.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  data: state.documents.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
