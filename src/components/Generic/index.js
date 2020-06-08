import React from 'react';
import {
  Text,
  ScrollView
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
  }
  render() {
    let info = this.props.information[0]

    return (
        <ScrollView style={styles.containerMargin}>
          <Text style={styles.titles}>{info.title}</Text>
          <Text style={styles.body}>{info.description}</Text>
        </ScrollView>
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
