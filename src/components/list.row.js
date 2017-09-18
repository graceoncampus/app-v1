import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import CardSection from './CardSection.js';

import AppStyles from '../styles';
import AppConfig from '../config';

export default class listRow extends Component {
  render = () => {
    const { source, onPress } = this.props;
    if (source.image !== null) {
      return (
        <TouchableOpacity
          style={[styles.listRow, styles.imageBackground]}
          onPress={onPress}
        >
          <Image source={{ uri: source.image }} style={[styles.imageBackground_image]}>
            <Text 
              style={[
                AppStyles.baseText,
                styles.listRow_text,
                styles.listRowImage_text
              ]}
            >
              {source.name}
            </Text>
          </Image>
        </TouchableOpacity>
      );
    }
      
    return (
      <TouchableOpacity onPress={onPress} >
        <View>
          <CardSection style={styles.containerStyle}>
            <Text style={[AppStyles.baseText, styles.listRow_text]}>
              {source.name}
            </Text>
          </CardSection>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    textAlign: 'center',
  },
  containerStyle: {
      borderBottomWidth: 1,
      padding: 5,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#ddd',
      position: 'relative'
  },
  listRow: {
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
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

  // With Image
  imageBackground: {
    backgroundColor: '#333',
  },
  imageBackground_image: {
    height: AppConfig.windowHeight / 4,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  }

};
