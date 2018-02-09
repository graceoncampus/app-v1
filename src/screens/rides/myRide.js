import React, { Component } from 'react';
import { ScrollView, Linking } from 'react-native';
import { Divider, Screen, Row, Caption, View, Subtitle, Button, Text, Title, TouchableOpacity, Spinner } from '@shoutem/ui';
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
      ridesData: null,
    };
    this.props.singleRideFetch();
  }

  componentWillReceiveProps = (nextProps) => {
    const { myRideData } = nextProps;
    if (myRideData) this.setState({ ridesData: myRideData });
  }

  renderDriver(driverName, userArr) {
      const user = userArr[0];
      const navigateAction = NavigationActions.navigate({
        routeName: 'User',
        params: { user },
      });
      if(user !== '') {
        return (
        <TouchableOpacity onPress={() => { this.props.navigation.dispatch(navigateAction); }}>
        <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#fff' }}>
        <Subtitle style={{ textAlign: 'center', color: '#ae956b' }}>{driverName}</Subtitle>
        </View>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#fff' }}>
        <Subtitle style={{ textAlign: 'center' }}>{driverName}</Subtitle>
        </View>
      )
    }
  }

  renderRiders(riderList, userArr) {
      let i = 1;
      return riderList.map((rider) => {
        const user = userArr[i]
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

  render() {
    if(this.props.isLoading == true) {
      return (
        <View styleName='vertical fill-parent v-center h-center'>
        <Spinner style={{ size: 'large' }}/>
        </View>
      );
    }
    if(this.state.ridesData) {
     if(this.state.ridesData.driver.toLowerCase() == "in progress") {
       return (
         <Screen>
         <View styleName='vertical fill-parent v-center h-center'>
         <Subtitle>It looks like your car is still in progress!</Subtitle>
         </View>
         </Screen>
       );
     }
     else {
       return (
         <Screen>
         <ScrollView>
         <Divider styleName="section-header">
         <Caption>Driver</Caption>
         </Divider>
         {this.renderDriver(this.state.ridesData.driver, this.state.ridesData.userList)}
         <Divider styleName="section-header">
         <Caption>Riders</Caption>
         </Divider>
         {this.renderRiders(this.state.ridesData.riders, this.state.ridesData.userList)}
         {
           (this.state.ridesData.driver2 !== "") &&
           <View>
             <Divider styleName="line" />
             <Divider styleName="section-header">
             <Caption>Driver</Caption>
             </Divider>
             {this.renderDriver(this.state.ridesData.driver2, this.state.ridesData.userList2)}
             <Divider styleName="section-header">
             <Caption>Riders</Caption>
             </Divider>
             {this.renderRiders(this.state.ridesData.riders2, this.state.ridesData.userList2)}
             </View>
         }
         </ScrollView>
         </Screen>
       );
     }
   }
   else
   return (
     <Screen>
     <View styleName='vertical fill-parent v-center h-center'>
     <Subtitle>Your car is not available at this time</Subtitle>
     </View>
     </Screen>
   );
 }
}

const mapStateToProps = ({ RidesReducer }) => {
  const { myRideData, isLoading } = RidesReducer;

  return { myRideData, isLoading };
};

export default connect(mapStateToProps, { singleRideFetch })(MyRide);
