import React, { Component } from 'react';
import { ScrollView, Linking } from 'react-native';
import { Divider, Screen, Caption, View, Subtitle, Button, Text } from '@shoutem/ui';
import { connect } from 'react-redux';

import { singleRideFetch } from '../../actions';

class MyRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ridesData: [],
    };
    this.props.singleRideFetch();
  }

  componentWillReceiveProps = (nextProps) => {
    const rides = nextProps.myRideData;
    this.setState({
      ridesData: rides,
      isRefreshing: false,
    });
  }

  textRiders() {
    var numbersArray = this.state.ridesData[0].riderNumbers;
    var numberString = '';
      for(var i = 0; i < numbersArray.length; i++) {
        numbersArray[i] = numbersArray[i].replace(/\D/g,'');
        if (i == 0) {
          numberString = numbersArray[0];
        }
        else {
          numberString = numberString + ',' + numbersArray[i];
        }
      }
      console.log(numberString);
      Linking.openURL(`sms:${numberString}`);
  }

  renderRides() {
    return this.state.ridesData.map((car, i) => {
      if (i % 2 === 0) {
        return (
          <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#fff' }} styleName='horizontal space-between v-start' key={i}>
            <Subtitle style={{ textAlign: 'right' }}>{car.driver}</Subtitle>
            <Subtitle style={{ textAlign: 'right' }}>{car.riders.join('\n')}</Subtitle>
          </View>
        );
      }
      return (
        <View style={{ paddingVertical: 10, paddingHorizontal: 15 }} styleName='horizontal space-between v-start' key={i}>
          <Subtitle style={{ textAlign: 'right' }}>{car.driver}</Subtitle>
          <Subtitle style={{ textAlign: 'right' }}>{car.riders.join('\n')}</Subtitle>
        </View>
      );
    });
  }

  render() {
    return (
      <Screen>
      <View style={{ padding: 25 }} styleName='vertical h-center v-end'>
        <Button onPress={() => this.textRiders()}>
          <Text>TEXT RIDERS</Text>
        </Button>
      </View>

        <Divider styleName="section-header">
          <Caption>Driver</Caption>
          <Caption>Riders</Caption>
        </Divider>
        <ScrollView>
          {this.renderRides()}
        </ScrollView>
      </Screen>
    );
  }
}

const mapStateToProps = ({ RidesReducer }) => {
  const { myRideData } = RidesReducer;

  return { myRideData };
};

export default connect(mapStateToProps, { singleRideFetch })(MyRide);
