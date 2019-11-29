import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { BarIndicator } from 'react-native-indicators';

class LoadingOverlay extends React.Component {
  render() {
    const { processing } = this.props;
    return (
      <Spinner
        visible={processing}
        customIndicator={<BarIndicator color='#f50057' count={5} />}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  processing: state.ui.processing,
});

export default connect(mapStateToProps)(LoadingOverlay);
