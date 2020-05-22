import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import SafeAreaViewDecider from '../SafeAreaViewDecider'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNew } from '../../actions/news';
import { Alert } from 'react-native';
import styles from '../styles';
import ResponsiveImageView from 'react-native-responsive-image-view';

class NewsDetail extends React.Component {
  componentDidMount = () => {
      const { loadDetail } = this.props;
      loadDetail(this.props.navigation.state.params.id);
  }

  render() {
    const { data } = this.props;

    return(
      <ScrollView>
        <SafeAreaViewDecider statusBarHiddenForNotch={true} statusBarHiddenForNonNotch={false} backgroundColor="crimson"/>
        <View style={styles.containerMargin}>
          <Text style={styles.titleNews}>{data.title}</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
          <ResponsiveImageView source={{ uri: data.image }}>
            {({ getViewProps, getImageProps }) => (
              <View {...getViewProps()}>
                <Image {...getImageProps()} />
              </View>
            )}
          </ResponsiveImageView>

          <Text style={styles.newsBody}>{data.body}</Text>
        </View>
      </ScrollView>
    );
  }
}

NewsDetail.propTypes = {
  data: PropTypes.object,
  loadDetail: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

NewsDetail.defaultProps = {
  data: {},
};

const mapStateToProps = (state) => ({
  data: state.news.item,
});

const mapDispatchToProps = (dispatch) => ({
  loadDetail: (id) => dispatch(getNew(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
