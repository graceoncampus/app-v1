/* eslint global-require: 0 */

import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import * as firebase from 'firebase';
import { Font } from 'expo';
import { StyleProvider } from '@shoutem/theme';
import { getTheme } from '@shoutem/ui';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './src/reducers/index';
import AppWithNavigationState from './src/navigators/AppNavigator';
import config from './src/config';
import LoadingSplash from './src/screens/loadingSplash';

firebase.initializeApp(config.firebaseConfig);

const middleware = [
  thunk,
  __DEV__ && createLogger(),
];
const theme = {
  ...getTheme(),
  'shoutem.ui.Subtitle': {
    fontFamily: 'Akkurat-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#3a3f4b',
    fontSize: 15,
    lineHeight: 18,
    '.link': {
      color: '#082ea1',
    },
  },
  'shoutem.ui.Caption': {
    fontFamily: 'Akkurat-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#848895',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  'shoutem.ui.Title': {
    fontFamily: 'Akkurat-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#04164d',
    lineHeight: 25,
    '.textBelow': {
      paddingBottom: 7,
    },
  },
  'shoutem.ui.Screen': {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  'shoutem.ui.Text': {
    fontFamily: 'Arnhem',
    fontSize: 20,
    color: '#3a3f4b',
    lineHeight: 20,
    '.buttonText': {
      fontFamily: 'Akkurat-Regular',
      fontSize: 12,
      color: '#fff',
      letterSpacing: 1,
      textAlign: 'center',
    },
  },

  'shoutem.ui.Heading': {
    fontFamily: 'Akkurat-Regular',
    color: '#3a3f4b',
    fontSize: 25,
    lineHeight: 30,
  },
  'shoutem.ui.Button': {
    'shoutem.ui.Text': {
      fontFamily: 'Akkurat-Regular',
      fontSize: 12,
      color: '#fff',
      letterSpacing: 1,
      textAlign: 'center',
    },
    backgroundColor: '#082ea1',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    height: 50,
    '.success': {
      backgroundColor: '#0ab435',
    },
    '.outline': {
      backgroundColor: 'transparent',
      borderColor: '#082ea1',
      borderWidth: 1,
      'shoutem.ui.Text': {
        color: '#082ea1',
      },
    },
  },
  'shoutem.ui.FormGroup': {
    '.search': {
      'shoutem.ui.View': {
        paddingHorizontal: 0,
        'shoutem.ui.TextInput': {
          borderWidth: 0,
          borderBottomWidth: 1,
          margin: 0,
        },
      },
    },
    'shoutem.ui.View': {
      paddingHorizontal: 25,
      'shoutem.ui.Caption': {
        paddingTop: 10,
      },
      'shoutem.ui.TextInput': {
        borderWidth: 1,
        borderColor: '#dfe0e3',
        fontFamily: 'Akkurat-Regular',
        marginTop: 3,
        height: 50,
        paddingVertical: 9,
        marginBottom: 7,
        borderRadius: 1,
        '.focused': {
          borderColor: '#617cce',
        },
      },
    },
  },
};
export default class App extends React.Component {
  async componentWillMount() {
    this.setState({ loading: true });
    await Font.loadAsync({
      Arnhem: require('./fonts/ArnhemFine-Normal.otf'),
      'Akkurat-Bold': require('./fonts/Akkurat-Bold.ttf'),
      'Akkurat-Regular': require('./fonts/Akkurat-Normal.otf'),
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });
    this.setState({ loading: false });
  }

  store = compose(
    applyMiddleware(...middleware),
  )(createStore)(rootReducer);

  render() {
    if (!this.state.loading) {
      return (
        <StyleProvider style={theme}>
          <Provider store={this.store}>
            <AppWithNavigationState />
          </Provider>
        </StyleProvider>
      );
    }

    return (
      <LoadingSplash />
    );
  }
}
