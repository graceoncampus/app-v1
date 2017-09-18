import React, { Component } from 'react';
import { Screen, Button, Text, View, Tile, Title, Caption, Subtitle, Icon, TouchableOpacity } from '@shoutem/ui';
import firebase from 'firebase';

class FirstLoad extends Component {
  constructor(props) {
    super(props);
    if (this.props.navigation && firebase.auth().currentUser) {
      this.props.navigation.navigate('Main');
    }
  }
  render = () => {
    if (this.props.navigation && firebase.auth().currentUser) {
      this.props.navigation.navigate('Main');
    }
    return (
      <Screen>
        <Tile style={{ paddingTop: 0, paddingBottom: 40, flex: 0.4, backgroundColor: 'transparent', justifyContent: 'flex-end' }} styleName='text-centric'>
          <Title styleName='sm-gutter-bottom'>Yew!</Title>
          <Caption>Select an Option to Get Started</Caption>
        </Tile>
        <View style={{ paddingHorizontal: 25, flex: 0.25 }} styleName='vertical h-center v-end'>
          <Button style={{ marginBottom: 10 }} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>SIGN UP</Text>
          </Button>
          <Button style={{ marginBottom: 20 }} styleName='outline' onPress={() => this.props.navigation.navigate('Login')}>
            <Text>LOG IN</Text>
          </Button>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
            <View styleName='horizontal h-center v-center'><Subtitle styleName='link'>I don't want awesome features</Subtitle><Icon style={{ color: '#ae956b', fontSize: 17, lineHeight: 24 }} name="right-arrow" /></View>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}

export default FirstLoad;
