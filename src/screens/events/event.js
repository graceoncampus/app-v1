import React from 'react';
import {
  TouchableOpacity,
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
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  render() {
    const { event: { image, title, startdate, location, summary } } = this.props.navigation.state.params;
    return (
      <Screen>
        <Divider />
        <View styleName='vertical h-center' style={{ borderBottomWidth: 1, borderBottomColor: '#ecedef' }} >
          <Title>{title}</Title>
          <Divider />
          {location &&
              <Caption><Caption styleName="bold">Where: </Caption>{location}</Caption>
          }
          {startdate &&
              <Caption><Caption styleName="bold">When: </Caption>{moment.unix(startdate).format('MMMM Do HH:mm')}</Caption>
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
