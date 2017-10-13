import React from 'react';
import { connect } from 'react-redux';
import { StatusBar, Platform } from 'react-native';
import { addNavigationHelpers, DrawerNavigator, StackNavigator } from 'react-navigation';
import about from '../screens/about';
import FirstLoad from '../screens/first.load';
import Signup from '../screens/auth/signup';
import loadingSplash from '../screens/loadingSplash';
import ForgotPassword from '../screens/auth/forgotPassword';
import leaders from '../screens/leadership/leaders';
import roster from '../screens/roster/roster';
import IndividualUser from '../screens/roster/individualUser';
import gocConnect from '../screens/connect';
import events from '../screens/events/events';
import event from '../screens/events/event';
import rides from '../screens/rides/ridesTab';
import myRide from '../screens/rides/myRide';
import classes from '../screens/classes/classes';
import Class from '../screens/classes/class';
import leader from '../screens/leadership/leader';
import UserInvite from '../screens/settings/userinvite';
import Settings from '../screens/settings/settings';
import ChangePassword from '../screens/settings/changePassword';
import Home from '../screens/home/homepage';
import addPost from '../screens/home/addPost';
import Post from '../screens/home/Post';
import editPost from '../screens/home/editPost'

const homeStack = StackNavigator({
  Home: { screen: Home },
  AddPost: { screen: addPost },
  Post: { screen: Post },
  editPost: { screen: editPost },
});

const aboutStack = StackNavigator({
  About: { screen: about },
});

const eventsStack = StackNavigator({
  Events: { screen: events },
  Event: { screen: event },
});

const classesStack = StackNavigator({
  Classes: { screen: classes },
  Class: { screen: Class },
});

const ridesStack = StackNavigator({
  Rides: { screen: rides },
  MyRide: { screen: myRide },
  User: { screen: IndividualUser }
});

const leadershipStack = StackNavigator({
  Leaders: { screen: leaders,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  Leader: { screen: leader,
    navigationOptions: {
      gesturesEnabled: false,
    } },
});

const connectStack = StackNavigator({
  GOCConnect: { screen: gocConnect },
});

const rosterStack = StackNavigator({
  Roster: { screen: roster },
  IndividualUser: { screen: IndividualUser },
});

const settingsStack = StackNavigator({
  Settings: { screen: Settings },
  PasswordChange: { screen: ChangePassword },
  inviteUser: { screen: UserInvite },
});

const DrawerNav = DrawerNavigator({
  Home: { screen: homeStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  'About Us': { screen: aboutStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  Leadership: { screen: leadershipStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  Connect: { screen: connectStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  Events: { screen: eventsStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  Classes: { screen: classesStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  Rides: { screen: ridesStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  Roster: { screen: rosterStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  Settings: { screen: settingsStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
}, {
  drawerWidth: 160,
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#ae956b',
    labelStyle: {
      fontFamily: 'Akkurat-Regular',
    },
    style: {
      height: 'auto',
      ...Platform.select({
        android: { paddingTop: StatusBar.currentHeight },
      }),
    },
  },
});
const forgotPasswordStack = StackNavigator({
  ForgotPassword: { screen: ForgotPassword },
});
const signupStack = StackNavigator({
  Signup: { screen: Signup },
});
export const AppNavigator = StackNavigator(
  {
    Loading: {
      screen: loadingSplash,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Auth: {
      screen: FirstLoad,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    ForgotPassword: {
      screen: forgotPasswordStack,
    },
    Signup: {
      screen: signupStack,
    },
    Main: {
      screen: DrawerNav,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    headerMode: 'none',
  },
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
