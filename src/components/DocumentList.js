import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => ({
  data: state.documents.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
