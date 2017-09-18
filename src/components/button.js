import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native'
import {
  Title,
  TouchableOpacity,
} from '@shoutem/ui';

import AppStyles from '../styles';
import AppConfig from '../config';

class Button extends Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    type: React.PropTypes.oneOf(['', 'outlined']),
    text: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf(['', 'small', 'medium', 'large']),
    disabled: React.PropTypes.bool,
  }

  static defaultProps = {
    onPress: () => {}, // Do nothing
    type: '',
    text: 'Click Here',
    size: 'medium',
    disabled: false,
  }

  render = () => {
    const { text, type, onPress, size, disabled } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
        style={[
          styles.button,
          type === 'outlined' && styles.buttonOutline,
          size === 'small' && styles.buttonSml,
          size === 'large' && styles.buttonLrg,
          disabled && styles.disabled
        ]}
      >
        <Title
        >
          {text}
        </Title>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppConfig.primaryColor,
    height: 50,
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button_text: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: parseInt(15 + (15 * 0.5)),
    fontFamily: AppConfig.baseFont,
    fontWeight: '800',
  },

  buttonOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: AppConfig.primaryColor,
  },
  buttonOutline_text: {
    color: AppConfig.primaryColor,
  },
  buttonLrg: {
    height: 65,
  },
  buttonLrg_text: {
    fontSize: 18,
    lineHeight: parseInt(18 + (18 * 0.5)),
  },

  // Small
  buttonSml: {
    height: 35,
  },
  buttonSml_text: {
    fontSize: 12,
    lineHeight: parseInt(12 + (12 * 0.5)),
  },

  disabled: {
    opacity: 25,
  },
});

export default Button;
