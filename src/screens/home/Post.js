import React, { Component } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Screen, Caption, Row, Image, View, Subtitle, Icon } from '@shoutem/ui';

export default class Post extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: 'HOME',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="back" style={{ paddingLeft: 10 }}/>
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
      headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
    })

    render() {
      const { announcement } = this.props.navigation.state.params;
      return (
        <Screen>
          <ScrollView>
            <View style={{ paddingHorizontal: 25 }} styleName="vertical v-start">
              <View style={{ height: 60 }} styleName="horizontal">
                <Image style={{ width: 25, height: 25, marginRight: 8 }} styleName="small-avatar" source={require('../../images/jeff.jpg')} />
                <View styleName='vertical'>
                  <Subtitle style={{ fontSize: 14, lineHeight: 14, fontFamily: 'Akkurat-Bold' }}>A-Team</Subtitle>
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
