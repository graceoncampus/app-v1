import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform, 
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Icon } from '@shoutem/ui';

import AllRides from './allRides';
import MyRide from './myRide';
import RidesSignup from './ridesSignup';

class RidesTab extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Rides',
    }),
    title: 'RIDES',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { paddingTop: 16, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  render = () => (
    <ScrollableTabView
      tabBarBackgroundColor='#fff'
      tabBarTextStyle={{ paddingTop: 10, fontFamily: 'Akkurat-Regular', fontSize: 13, color: '#222222', lineHeight: 15 }}
      tabBarUnderlineStyle={{ height: 2, backgroundColor: '#ae956b' }}
    >
      <MyRide tabLabel="My Ride" />
      <AllRides tabLabel="All Rides" />
      <RidesSignup tabLabel="Signup" />
    </ScrollableTabView>
  )
}

export default RidesTab;
