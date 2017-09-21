import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, Platform, ScrollView } from 'react-native';
import { Screen, Caption, Image, View, Subtitle, Icon } from '@shoutem/ui';

export default class Post extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: 'HOME',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back" style={{ paddingLeft: 10 }}/>
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { marginTop: StatusBar.currentHeight, paddingTop: 16, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
      headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
    })

    render() {
      const { announcement } = this.props.navigation.state.params;
      let image;
      if (announcement.role === 'A-Team') image = require('../../images/jeff.jpg');
      else if (announcement.role === 'Chris Gee') image = require('../../images/chrisgee.jpg');
      return (
        <Screen>
          <ScrollView>
            <View style={{ paddingHorizontal: 25 }} styleName="vertical v-start">
              <View style={{ height: 60 }} styleName="horizontal">
                <Image style={{ width: 25, height: 25, marginRight: 8 }} styleName="small-avatar" source={image} />
                <View styleName='vertical'>
                  <Subtitle style={{ marginBottom: 4, fontSize: 14, lineHeight: 14, fontFamily: 'Akkurat-Bold' }}>{announcement.role}</Subtitle>
                  <Caption style={{ lineHeight: 12 }} >{announcement.time}</Caption>
                </View>
              </View>
              <Subtitle style={{ marginTop: 15 }}>{announcement.post}</Subtitle>
            </View>
          </ScrollView>
        </Screen>
      );
    }
}
