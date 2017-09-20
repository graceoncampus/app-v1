import React, { Component } from 'react';
import {
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import { Icon, Divider, Button, Title, View, Screen, Text, Caption, Heading, Image } from '@shoutem/ui';
import { connect } from 'react-redux';
import firebase from 'firebase';

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
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })


  render = () => {
    const { user } = this.props.navigation.state.params;
    const name = user.firstName + ' ' + user.lastName;
    const bday = moment.unix(user.birthday).format('MMMM Do YYYY');
    const academic = 'Class of ' + user.grad + ', ' + user.major;
    const image = require('../../images/sample.jpg');
    return (
      <Screen>
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
        <View styleName='horizontal space-between' >
          <View style={{ flex: 0.5, marginRight: 5 }}>
            <Button styleName='clear' onPress={() => Linking.openURL('tel:' + user.phoneNumber)} >
            <Icon name="call" />
              <Text>CALL</Text>
            </Button>
          </View>
          <View style={{ flex: 0.5, marginLeft: 5 }}>
            <Button styleName='clear' onPress={() => Linking.openURL('sms:' + user.phoneNumber)} >
            <Icon name="social-wall" />
              <Text>TEXT</Text>
            </Button>
            </View>
            <View style={{ flex: 0.5, marginLeft: 5 }}>
            <Button styleName='clear' onPress={() => Linking.openURL('mailto:' + user.email)} >
              <Icon name="email" />
              <Text>EMAIL</Text>
            </Button>
          </View>
          </View>
        <Divider />
        <View style={{ borderTopWidth: 1, borderTopColor: '#ecedef', backgroundColor: 'white', paddingTop: 35, paddingHorizontal: 35, paddingBottom: 50 }}>
          <Caption>Email</Caption>
          <Title style={{ fontSize: 18 }}>{user.email}</Title>
          <Caption>Phone</Caption>
          <Title style={{ fontSize: 18 }}>{user.phoneNumber}</Title>
          <Caption>Birthday</Caption>
          <Title style={{ fontSize: 18 }}>{bday}</Title>
          <Caption>Address</Caption>
          <Title style={{ fontSize: 18 }}>{user.address}</Title>
          <Caption>Home Church</Caption>
          <Title style={{ fontSize: 18 }}>{user.homeChurch}</Title>
        </View>
      </Screen>
    );
  }
}

export default IndividualUser;
