import React from 'react';
import {
  Text,
  View,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInformation } from '../../actions/information';
import NavigationService from '../../navigation/NavigationService';
import EmptyListMessage from '../EmptyListMessage';
import styles from '../styles';

class Generic extends React.Component {
  componentDidMount = () => {
    const { loadInformation } = this.props;
    loadInformation();
  };
  _renderItem = ({item}) => {
    return (
      <View style={styles.info}>
        <Text style={styles.infoTitles}>{item.title}</Text>
        <Text style={styles.infoBody}>{item.body}</Text>
      </View>
    );
  };
  render() {
    let { information } = this.props

    return (
        <FlatList
          style={styles.containerMargin}
          data={information}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyListMessage text="No hay información cargada." />}
        />
    );
  }
}

Generic.propTypes = {
  loadInformation: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Generic.defaultProps = {
  information: [],
};

const mapStateToProps = (state) => ({
  information: state.information.information,
});

const mapDispatchToProps = (dispatch) => ({
  loadInformation: () => dispatch(getInformation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Generic);
