import React from 'react'
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import {connect} from 'react-redux'

import {fetchDocuments} from '../actions/documents'

class DocumentList extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(fetchDocuments())
  }

  render() {
    return (
      <SafeAreaView>
        <Text>{this.props.title}</Text>
        <FlatList
          data={this.props.data}
          extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={({item, index, separators}) => (
            <TouchableHighlight onPress={() => this._onPress(item)}>
              <View style={{backgroundColor: 'gray'}}>
                <Text>{item.title}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  data: state.documents.list,
})

export default connect(mapStateToProps)(DocumentList)

