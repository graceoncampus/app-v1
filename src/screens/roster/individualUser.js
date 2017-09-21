import React, { Component } from 'react';
import {
  Linking,
  TouchableOpacity, StatusBar, Platform, 
  ScrollView,
} from 'react-native';
import moment from 'moment';
import { Icon, Divider, Button, Title, View, Screen, Text, Caption, Heading, Image } from '@shoutem/ui';

class IndividualUser extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Roster',
    }),
    title: 'ROSTER',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Icon name='back' style={{ paddingLeft: 10 }} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { paddingTop: 16, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })


  render = () => {
    const { user } = this.props.navigation.state.params;
    const name = `${user.firstName} ${user.lastName}`;
    const bday = moment.unix(user.birthday).format('MMMM Do, YYYY');
    const academic = `Class of ${user.grad}, ${user.major}`;
    const image = require('../../images/sample.png');
    return (
      <Screen>
        <ScrollView>
          <Divider />
          <View styleName='vertical h-center' style={{ borderBottomWidth: 1, borderBottomColor: '#ecedef' }} >
            <Image
              style={{ width: 150, height: 150, marginBottom: 10, borderRadius: 75, borderWidth: 4, borderColor: 'white' }}
              source={image}
            />
            <Heading>{name}</Heading>
            <Caption>{academic}</Caption>
            <Divider />
          </View>
          <View style={{ paddingHorizontal: 50, paddingTop: 10 }} styleName='horizontal space-between' >
            <View>
              <Button styleName='stacked clear' onPress={() => Linking.openURL(`tel:${user.phoneNumber}`)} >
                <Icon name="call" />
                <Text>CALL</Text>
              </Button>
            </View>
            <View>
              <Button styleName='stacked clear' onPress={() => Linking.openURL(`sms:${user.phoneNumber}`)} >
                <Icon name="social-wall" />
                <Text>TEXT</Text>
              </Button>
            </View>
            <View>
              <Button styleName='stacked clear' onPress={() => Linking.openURL(`mailto:${user.email}`)} >
                <Icon name="email" />
                <Text>EMAIL</Text>
              </Button>
            </View>
          </View>
          <Divider />
          <View style={{ flex: 1, flexDirection: 'column', borderTopWidth: 1, borderTopColor: '#ecedef', backgroundColor: 'white', paddingTop: 35, paddingHorizontal: 35, paddingBottom: 50 }}>
            <Caption>Email</Caption>
            <Title style={{ fontSize: 18 }}>{user.email}</Title>
            <Caption style={{ marginTop: 4 }}>Phone</Caption>
            <Title style={{ fontSize: 18 }}>{user.phoneNumber}</Title>
            <Caption style={{ marginTop: 4 }}>Birthday</Caption>
            <Title style={{ fontSize: 18 }}>{bday}</Title>
            <Caption style={{ marginTop: 4 }}>Address</Caption>
            <Title style={{ fontSize: 18 }}>{user.address}</Title>
            <Caption style={{ marginTop: 4 }}>Home Church</Caption>
            <Title style={{ fontSize: 18 }}>{user.homeChurch}</Title>
          </View>
        </ ScrollView>
      </Screen>
    );
  }
}

export default IndividualUser;
