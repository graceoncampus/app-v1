import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  ListView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from '@shoutem/ui';

import AppStyles from '../../styles';
import EventRow from '../../components/list.row';
import { eventsFetch } from '../../actions';

class Events extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Events'
    }),
    title: 'EVENTS',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{paddingLeft: 10}}/>
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: "#222222", lineHeight: 18 }
  })
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isRefreshing: false,
    };
    this.props.eventsFetch();
    this.renderEvts = this.renderEvts.bind(this);
  }

  renderEvts() {
    const result = _.map(_.toArray(this.props.events), (event, key) => {
      return (
       <EventRow
          key={key}
          onPress={() => {
            this.props.navigation.navigate('Event', { event });
          }}
          source={event}
       />
      );
    });
    return (
      <ScrollView>
        {result}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={[AppStyles.container]}>
        {this.renderEvts()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.events };
};

export default connect(mapStateToProps, { eventsFetch })(Events);
