import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Text
} from 'react-native';

import AppStyles from '../styles';

class Loading extends Component {
  render = () => {
    const { text, transparent } = this.props;
    let colorOfSpinner = '#AAA';
    if (transparent) colorOfSpinner = '#000';

    return (
      <View
        style={[
          AppStyles.container,
          AppStyles.containerCentered,
          transparent && { backgroundColor: 'rgba(255,255,255,0.75)' }
        ]}
      >
        <ActivityIndicator
          animating size="large"
          color={colorOfSpinner}
        />
        <View style={[AppStyles.spacer_10]} />
        {text &&
          <Text style={[AppStyles.baseText]}>
            {text}
          </Text>
        }
      </View>
    );
  }
}

export default Loading;
