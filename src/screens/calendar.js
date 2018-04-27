import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform, StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { Icon, View, Text } from '@shoutem/ui';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { calendarFetch } from '../actions';

class CalendarScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'CALENDAR',
    }),
    title: 'CALENDAR',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerRight: <View />,  headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0,  height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
    this.props.calendarFetch();
  }

  componentWillReceiveProps = (nextProps) => {
    const data = nextProps.calendarData;
    this.setState({
      items: data.events,
    });
  }
  
  loadItems(day) {}

  renderItem(item) {
    return (
      <View style={{
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        height: item.height,

      }}><Text>{item.text}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

// this.loadItems.bind(this)
  render () {
    return (
      <Agenda
         items={this.state.items}
         loadItemsForMonth={this.loadItems.bind(this)}
         selected={'2017-01-22'}
         renderItem={this.renderItem.bind(this)}
         renderEmptyDate={this.renderEmptyDate.bind(this)}
         rowHasChanged={this.rowHasChanged.bind(this)}
         // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
       />
    )
  }
}


const styles = StyleSheet.create({
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

const mapStateToProps = ({ CalendarReducer }) => {
  const { calendarData } = CalendarReducer;
  return { calendarData };
};


export default connect(mapStateToProps, { calendarFetch })(CalendarScreen);
