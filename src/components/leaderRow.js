import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import AppStyles from '../styles';
import AppConfig from '../config';

export default class LeaderRow extends Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
  }
  static defaultProps = {
    title: 'Lorem Ipsum',
  }
  render = () => {
    const { title, image, onPress } = this.props;

    if (image) {
      return (
        <TouchableOpacity 
          style={[styles.listRow, image && styles.imageBackground]} 
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Image source={image} style={[styles.imageBackground_image]}>
            <Text style={[AppStyles.baseText, styles.listRow_text, styles.listRowImage_text]}>
              {title.toUpperCase()}
            </Text>
          </Image>
        </TouchableOpacity>
      );
    } 
    return (
      <TouchableOpacity style={[styles.listRow]} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.listRowInner}>
          <Text style={[AppStyles.baseText, styles.listRow_text]}>{title.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listRow: {
    left: 0,
    right: 0,
    backgroundColor: '#FFF'
  },
  listRowInner: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppConfig.borderColor,
  },
  listRow_text: {
    color: AppConfig.textColor,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  listRowImage_text: {
    color: '#FFF',
  },
  imageBackground: {
    backgroundColor: '#333',
  },
  imageBackground_image: {
    height: AppConfig.windowHeight / 4,
    width: AppConfig.windowWidth,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  }
});
