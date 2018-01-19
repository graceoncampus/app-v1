import React from 'react';
import {
  TouchableOpacity, StatusBar, Platform, ScrollView, Linking,
} from 'react-native';
import moment from 'moment';
import { Icon, Divider, Title, View, Screen, Text, Caption, Button } from '@shoutem/ui';

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
    headerRight: <View />,  headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0,  height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

parseAndFindURLs(summary) {
  // Can only add one link per event description using this method
  const re = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  let url = '';
  let link = ''; // in event url does not start with https://
  url = summary.match(re);
  if (url) {
    url = url[0].trim();
    link = url;
    var prefix = 'https://';
    if (url.substr(0, prefix.length) !== prefix)
      link = prefix + link;
  }
  if (url != '') {
    var text = summary.split(url);
    return ([text[0], link, text[1]]);
  }
  return ([summary, '', '']);
}
  render() {
    const { event: { enddate, title, startdate, location, summary } } = this.props.navigation.state.params;
    const description = this.parseAndFindURLs(summary);
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
            <Caption><Caption styleName="bold">When: </Caption>{moment.unix(startdate).format('MMMM Do, h:mm A')} - {moment.unix(enddate).format('h:mm A')}</Caption>
            :
            <Caption><Caption styleName="bold">When: </Caption>{moment.unix(startdate).format('MMMM Do')} - {moment.unix(enddate).format('MMMM Do')}</Caption>
          }
          <Divider />
        </View>
        <ScrollView>
          { summary &&
            <View style={{ backgroundColor: 'white', paddingTop: 35, paddingHorizontal: 35, paddingBottom: 50 }}>
              <Text> {description[0]}</Text>
              { (description[1] != null) &&
                <Text style={{ color: '#ae956b' }} onPress={() => Linking.openURL(description[1])} >
                  {description[1]}
                </Text>
              }
              <Text>{description[2]}</Text>
            </View>
          }
        </ScrollView>
      </Screen>
    );
  }
}
