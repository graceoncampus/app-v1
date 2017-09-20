import React from 'react';
import { connect } from 'react-redux';
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
// import EventsCreate from '../screens/events/eventsCreate';
import rides from '../screens/rides/ridesTab';
import classes from '../screens/classes/classes';
import Class from '../screens/classes/class';
// import addClass from '../screens/classes/addClass';
import leader from '../screens/leadership/leader';
import UserInvite from '../screens/settings/userinvite';
import Settings from '../screens/settings/settings';
import ChangePassword from '../screens/settings/changePassword';
import Home from '../screens/home/homepage';
import addPost from '../screens/home/addPost';

const homeStack = StackNavigator({
  Home: { screen: Home },
  AddPost: { screen: addPost },
});

const aboutStack = StackNavigator({
  About: { screen: about },
});

const eventsStack = StackNavigator({
  Events: { screen: events },
  Event: { screen: event },
});

// const eventsCreateStack = StackNavigator({
//   EventsCreate: { screen: EventsCreate },
// });

// const classCreateStack = StackNavigator({
//   ClassCreate: { screen: addClass },
// });

const classesStack = StackNavigator({
  Classes: { screen: classes },
  Class: { screen: Class },
});

const ridesStack = StackNavigator({
  Rides: { screen: rides },
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
  IndividualUser: { screen: IndividualUser }
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
  // 'Create Event': { screen: eventsCreateStack },
  Classes: { screen: classesStack,
    navigationOptions: {
      gesturesEnabled: false,
    } },
  // 'Create Class': { screen: classCreateStack },
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
  drawerWidth: 150,
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#ae956b',
    labelStyle: {
      fontFamily: 'Akkurat-Regular',
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
