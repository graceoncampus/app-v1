import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform, StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Icon, View, Text } from '@shoutem/ui';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
      items: {}
    };
  }
  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
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

  render () {
    return (
      <Agenda
         items={this.state.items}
         loadItemsForMonth={this.loadItems.bind(this)}
         selected={'2017-05-16'}
         renderItem={this.renderItem.bind(this)}
         renderEmptyDate={this.renderEmptyDate.bind(this)}
         rowHasChanged={this.rowHasChanged.bind(this)}
         // markingType={'period'}
         // markedDates={{
         //   '2017-05-08': {periods: [{textColor: '#666'}]},
         //   '2017-05-09': {periods: [{textColor: '#666'}]},
         //   '2017-05-14': {periods: [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}]},
         //   '2017-05-21': {periods: [{startingDay: true, color: 'blue'}]},
         //   '2017-05-22': {periods: [{endingDay: true, color: 'gray'}]},
         //   '2017-05-24': {periods: [{startingDay: true, color: 'gray'}]},
         //   '2017-05-25': {periods: [{color: 'gray'}]},
         //   '2017-05-26': {periods: [{endingDay: true, color: 'gray'}]}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
         //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
       />
    )
  }
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
export default CalendarScreen;
