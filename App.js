/* eslint global-require: 0 */

import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import * as firebase from 'firebase';
import { Font, Permissions, Notifications } from 'expo';
import {
  StyleProvider,
  getSizeRelativeToReference,
} from '@shoutem/theme';
import { getTheme } from '@shoutem/ui';
import thunk from 'redux-thunk';

import rootReducer from './src/reducers/index';
import AppWithNavigationState from './src/navigators/AppNavigator';
import LoadingSplash from './src/screens/loadingSplash';

import { postFetch } from './src/actions';

function dimensionRelativeToIphone(dimension, actualRefVal = window.width) {
  return getSizeRelativeToReference(dimension, 375, actualRefVal);
}
const config = {
  apiKey: 'AIzaSyC5FN_4EfqAcIoPOOVzTXeze-afOVS_YZo',
  authDomain: 'goc-app-6efe2.firebaseapp.com',
  databaseURL: 'https://goc-app-6efe2.firebaseio.com',
  storageBucket: 'goc-app-6efe2.appspot.com',
  messagingSenderId: '44635103582',
};

firebase.initializeApp(config);

const middleware = [
  thunk,
];
const theme = {
  ...getTheme(),
  'shoutem.ui.DropDownMenu': {
    horizontalContainer: {
      alignItems: 'flex-start',
      backgroundColor: '#fff',
      height: 39,
      paddingHorizontal: 25,
      paddingVertical: 9,
    },

    selectedOption: {
      'shoutem.ui.Icon': {
        color: '#fff',
      },

      'shoutem.ui.Text': {
        margin: 0,
      },

      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'flex-start',
      padding: 0,
    },
  },
  'shoutem.ui.Subtitle': {
    fontFamily: 'Akkurat-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#3a3f4b',
    fontSize: 15,
    lineHeight: 18,
    '.link': {
      color: '#ae956b',
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
    '.bold': {
      fontFamily: 'Akkurat-Bold',
    },
    '.link': {
      color: '#ae956b',
    },
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
    '.clear': {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderRadius: 0,
    },
    '.stacked': {
      'shoutem.ui.Icon': {
        marginVertical: 6,
        marginRight: 0,
      },

      'shoutem.ui.Text': {
        textAlign: 'center',
        marginVertical: 0,
        marginRight: 0,
        fontFamily: 'Akkurat-Regular',
        color: '#3a3f4b',
      },

      width: dimensionRelativeToIphone(120),
      height: 82,
      flexDirection: 'column',
    },
    backgroundColor: '#ae956b',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    height: 50,
    '.success': {
      backgroundColor: '#0ab435',
    },
    '.red': {
      backgroundColor: '#b40a34',
    },
    '.outline': {
      backgroundColor: 'transparent',
      borderColor: '#ae956b',
      borderWidth: 1,
      'shoutem.ui.Text': {
        color: '#ae956b',
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
          borderColor: '#ae956b',
        },
      },
    },
  },
};
const registerForPushNotificationsAsync = async () => {
  const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }
  const token = await Notifications.getExpoPushTokenAsync();
  await firebase.database().ref('tokens').push(token);
  await AsyncStorage.setItem('token', token);
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
    const value = await AsyncStorage.getItem('token');
    if (!value) await registerForPushNotificationsAsync();
    this.setState({ loading: false });
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  componentDidMount() {
    firebase.database().ref('posts').on('child_added', () => {
      this.store.dispatch(postFetch());
    });
  }

  _handleNotification = (notification) => {
    this.setState({ notification });
  };

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
