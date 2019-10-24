import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchDocuments } from '../actions/documents';

class DocumentList extends React.Component {
  componentDidMount = () => {
    this.props.loadDocuments();
  }

  render() {
    const { title, data } = this.props;
    return (
      <SafeAreaView>
        <Text>{title}</Text>
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight>
              <View style={{ backgroundColor: 'gray' }}>
                <Text>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
    );
  }
}

DocumentList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  loadDocuments: PropTypes.func.isRequired,
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
