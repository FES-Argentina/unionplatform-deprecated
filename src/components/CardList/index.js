import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDocuments } from '../../actions/documents';
import NavigationService from '../../navigation/NavigationService';
import styles from './styles';

class CardList extends React.Component {
  componentDidMount = () => {
    const { loadDocuments } = this.props;
    loadDocuments();
  }

  itemView = (id) => {
    NavigationService.navigate('NewsDetail', {id} );
  }

  render() {
    const { data } = this.props;

    return (
      <FlatGrid
        itemDimension={300}
        items={data}
        style={styles.gridView}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => this.itemView(item.id)}>
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

CardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loadDocuments: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

CardList.defaultProps = {
  data: [],
};

const mapStateToProps = (state) => ({
  data: state.documents.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
