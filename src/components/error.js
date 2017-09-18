import React from 'react';
import { 
  View, 
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppStyles from '../styles';

export default (props) => {
  const text = props.text || 'Woops, Something wen\'t wrong.';
  return (
    <View style={[AppStyles.container, AppStyles.containerCentered]}>
      <Icon name={'ios-alert-outline'} size={50} color={'#CCC'} />
      <View style={[AppStyles.spacer_10]} />
      <Text style={[AppStyles.baseText]}>{text}</Text>
    </View>
  );
};
