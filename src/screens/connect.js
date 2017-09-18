import React, { Component } from 'react';
import {
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Icon, Screen, Image, View, Text, Tile, Title, Button, Divider } from '@shoutem/ui';

class Connect extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'CONNECT',
    }),
    title: 'CONNECT',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  render = () => (
    <Screen>
      <ScrollableTabView
        tabBarBackgroundColor='#fff'
        tabBarTextStyle={{ paddingTop: 10, fontFamily: 'Akkurat-Regular', fontSize: 13, color: '#222222', lineHeight: 15 }}
        tabBarUnderlineStyle={{ height: 2, backgroundColor: '#ae956b' }}
      >
        <ScrollView tabLabel="Large Groups"
          automaticallyAdjustContentInsets={false}
        >
          <Image
            styleName='large-banner'
            source={require('../images/largeGroupPhoto.png')}
          >
            <Tile>
              <Title> </Title>
            </Tile>
          </Image>
          <View style={{ paddingLeft: 35, paddingRight: 35 }} styleName='vertical'>
            <Divider />
            <Title styleName='textBelow'>What is Large Group?</Title>
            <Text>
              Every Friday night we gather for a time of singing, hearing God's Word taught, and fellowship. It is during these weekly large group meetings that GOC comes together corporately to worship our great God.
            </Text>
            <Divider />
            <Title styleName='textBelow'>I want to attend large group!</Title>
            <Text>We meet at every Friday at 7 p.m. at Broad 2160E. See you there!</Text>
            <Divider />
            <Button onPress={() => Linking.openURL('https://goo.gl/maps/69Z54gtDD8U2')}>
              <Text>GET DIRECTIONS</Text>
            </Button>
            <Divider />
            <Divider />
            <Divider />
          </View>
        </ScrollView>
        <ScrollView tabLabel="Small Groups">
          <Divider />
          <View style={{ paddingLeft: 35, paddingRight: 35 }} styleName='vertical'>
            <Title styleName='textBelow'>What are Small Groups?</Title>
            <Text>Small groups are the backbone of our discipleship ministry. Each small group focuses on Bible study, prayer, fellowship, and accountability. In these smaller, more intimate groups, we have the opportunity to develop deep relationships so that we can better love, serve, and care for each other. Each small group has a leader who will minister to your spiritual needs, counsel you through life’s tough issues, and spur you on in your walk with the Lord.</Text>
            <Divider />
            <Title styleName='textBelow'>I want to join a small group!</Title>
            <Text>Awesome! Here are the small group leader blurbs. Feel free to contact any of the leaders about joining.</Text>
            <Divider />
            <View styleName='horizontal space-between'>
              <View style={{ flex: 0.5, marginRight: 5 }}>
                <Button styleName='outline' onPress={() => Linking.openURL('https://graceoncampus.org/docs/sgl-women.pdf')} >
                  <Text>WOMEN</Text>
                </Button>
              </View>
              <View style={{ flex: 0.5, marginLeft: 5 }}>
                <Button styleName='outline' onPress={() => Linking.openURL('https://graceoncampus.org/docs/sgl-men.pdf')} >
                  <Text>MEN</Text>
                </Button>
              </View>
            </View>
            <Divider />
            <Divider />
            <Divider />
          </View>
        </ScrollView>
      </ScrollableTabView>
    </Screen>
  )
}

export default Connect;
