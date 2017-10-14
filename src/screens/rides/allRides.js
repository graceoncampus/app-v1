import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Divider, Screen, Caption, Spinner, View, Subtitle } from '@shoutem/ui';
import { connect } from 'react-redux';

import { ridesFetch } from '../../actions';

class AllRides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ridesData: [],
    };
    this.props.ridesFetch();
  }

  componentWillReceiveProps = (nextProps) => {
    const rides = nextProps.ridesData;
    if(rides == null) {
        this.setState({
        ridesData: null,
        isRefreshing: false,
      });
    }
    else {
    this.setState({
      ridesData: rides,
      isRefreshing: false,
    });
  }
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
    if (this.state.ridesData && this.state.ridesData.length)
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
    )
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
  const { ridesData } = RidesReducer;
  return { ridesData };
};

export default connect(mapStateToProps, { ridesFetch })(AllRides);
