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
import styles from '../styles';

class Generic extends React.Component {
  componentDidMount = () => {
    const { loadInformation } = this.props;
    loadInformation();
  };
  _renderItem = ({item}) => {
    return (
      <View>
        <Text style={styles.titles}>{item.title}</Text>
        <Text style={styles.body}>{item.description}</Text>
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
  information: {},
};

const mapStateToProps = (state) => ({
  information: state.information.information,
});

const mapDispatchToProps = (dispatch) => ({
  loadInformation: () => dispatch(getInformation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Generic);
