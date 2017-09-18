import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Divider, Screen, Caption, View, Subtitle } from '@shoutem/ui';
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
