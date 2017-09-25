import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, Platform, ScrollView } from 'react-native';
import { Screen, Caption, Image, View, Subtitle, Icon } from '@shoutem/ui';

export default class Post extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: 'ANNOUNCEMENTS',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back" style={{ paddingLeft: 10 }}/>
        </TouchableOpacity>
      ),
      headerRight: <View />,
      headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0, height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
      headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
    })

    render() {
      const { announcement } = this.props.navigation.state.params;
      let image;
      if (announcement.role === 'A-Team') image = require('../../images/notification-icon.png');
      else if (announcement.role === 'Chris Gee') image = require('../../images/chrisgee.jpg');
      return (
        <Screen>
          <ScrollView>
            <View style={{ paddingHorizontal: 25 }} styleName="vertical v-start">
              <View style={{ height: 60 }} styleName="horizontal">
                <Image style={{ width: 25, height: 25, marginRight: 8 }} styleName="small-avatar" source={image} />
                <View styleName='vertical'>
                  <Subtitle style={{ marginBottom: 4, fontSize: 14, lineHeight: 18, fontFamily: 'Akkurat-Bold' }}>{announcement.role}</Subtitle>
                  <Caption style={{ lineHeight: 15 }} >{announcement.time}</Caption>
                </View>
              </View>
              <Subtitle style={{ fontFamily: 'Akkurat-Bold', marginTop: 15, marginBottom: 5 }} styleName="bold">{announcement.title}</Subtitle>
              <Subtitle>{announcement.post}</Subtitle>
            </View>
          </ScrollView>
        </Screen>
      );
    }
}
