import React from 'react';
import {
  TouchableOpacity, StatusBar, Platform,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import { Icon, Divider, Title, View, Screen, Text, Caption } from '@shoutem/ui';

export default class Event extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Events',
    }),
    title: 'EVENTS',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Icon name='back' style={{ paddingLeft: 10 }} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { paddingTop: 16, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  render() {
    const { event: { enddate, title, startdate, location, summary } } = this.props.navigation.state.params;
    return (
      <Screen>
        <Divider />
        <View styleName='vertical h-center' style={{ borderBottomWidth: 1, borderBottomColor: '#ecedef' }} >
          <Title>{title}</Title>
          <Divider />
          {location &&
              <Caption><Caption styleName="bold">Where: </Caption>{location}</Caption>
          }
          {moment.unix(startdate).format('MMMM Do') === moment.unix(enddate).format('MMMM Do') ?
            <Caption><Caption styleName="bold">When: </Caption>{moment.unix(startdate).format('MMMM Do, h:mm A')} - {moment.unix(enddate).format('h:mm')}</Caption>
            :
            <Caption><Caption styleName="bold">When: </Caption>{moment.unix(startdate).format('MMMM Do')} - {moment.unix(enddate).format('MMMM Do')}</Caption>
          }
          <Divider />
        </View>
        <ScrollView>
          { summary &&
            <View style={{ backgroundColor: 'white', paddingTop: 35, paddingHorizontal: 35, paddingBottom: 50 }}>
              <Text>
                { summary }
              </Text>
            </View>
          }
        </ScrollView>
      </Screen>
    );
  }
}
