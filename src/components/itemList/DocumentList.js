import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';

import { fetchDocuments } from '../../actions/documents';

class DocumentList extends React.Component {
  componentDidMount = () => {
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  itemView = () => {
    const { navigation } = this.props;
    navigation.navigate('Complaints');
  }

  render() {
    const { data } = this.props;

    return (
      <FlatGrid
        itemDimension={300}
        items={data}
        style={styles.gridView}
        extraData={this.state}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={this.itemView}>
            <View style={[styles.itemContainerGrid, { backgroundColor: '#ff5252' }]}>
              <ImageBackground style={styles.backgroundImage} source={{ uri: item.photo }}>
                <Text style={styles.itemTitleGrid}>{item.title}</Text>
                <Text style={styles.itemNameGrid}>{item.summary}</Text>
              </ImageBackground>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

DocumentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loadDocuments: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

DocumentList.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  data: state.documents.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
