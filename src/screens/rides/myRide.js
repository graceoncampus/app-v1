import React, { Component } from 'react';
import { ScrollView, Linking } from 'react-native';
import { Divider, Screen, Caption, View, Subtitle, Button, Text, Title, TouchableOpacity, Spinner } from '@shoutem/ui';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { singleRideFetch } from '../../actions';

class MyRide extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'MyRide',
    }),
    title: 'MY RIDE',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Icon name='back' style={{ paddingLeft: 10 }} />
      </TouchableOpacity>
    ),
    headerRight: <View />,
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0, height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.state = {
      ridesData: {},
      isRefreshing: true,
    };
    this.props.singleRideFetch();
  }

  componentWillReceiveProps = (nextProps) => {
    const rides = nextProps.myRideData;
    if(rides == null) {
      this.setState({
        ridesData: null,
        isRefreshing: false,
      });
    }
    this.setState({
      ridesData: rides,
      isRefreshing: false,
    });
  }

  renderDriver() {
    if(this.state.isRefreshing == false) {
      const { driver, userList } = this.state.ridesData;
      const user = userList[0];
      const navigateAction = NavigationActions.navigate({
        routeName: 'User',
        params: { user },
      });
      if(user !== '') {
        return (
        <TouchableOpacity onPress={() => { this.props.navigation.dispatch(navigateAction); }}>
        <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#fff' }}>
        <Subtitle style={{ textAlign: 'center', color: '#ae956b' }}>{driver}</Subtitle>
        </View>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#fff' }}>
        <Subtitle style={{ textAlign: 'center' }}>{driver}</Subtitle>
        </View>
      )
      }
    }
  }

  renderRiders() {
    if(this.state.isRefreshing == false) {
      const {riders, userList } = this.state.ridesData;
      let i = 1;
      return riders.map((rider) => {
        const user = userList[i]
        i++;
        const navigateAction = NavigationActions.navigate({
          routeName: 'User',
          params: { user },
        });
        if(user !== '') {
          return (
            <TouchableOpacity onPress={() => { this.props.navigation.dispatch(navigateAction); }}>
            <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
            <Subtitle style={{ textAlign: 'center', color: '#ae956b' }}>{rider}</Subtitle>
            </View>
            </TouchableOpacity>
          )
        }
        else {
          return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
            <Subtitle style={{ textAlign: 'center' }}>{rider}</Subtitle>
            </View>
          )
        }
      });
    }
  }

  render() {
    if(this.state.ridesData && this.state.ridesData == {} )
    return (
      <Screen>
        <ScrollView>
        <Divider styleName="section-header">
          <Caption>Driver</Caption>
        </Divider>
        {this.renderDriver()}
        <Divider styleName="section-header">
          <Caption>Riders</Caption>
        </Divider>
        {this.renderRiders()}
        </ScrollView>
      </Screen>
    );
    else
    return (
      <Screen>
      <View styleName='vertical fill-parent v-center h-center'>
        <Subtitle>Rides for church this Sunday have not been posted yet</Subtitle>
      </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ RidesReducer }) => {
  const { myRideData } = RidesReducer;

  return { myRideData };
};

export default connect(mapStateToProps, { singleRideFetch })(MyRide);
