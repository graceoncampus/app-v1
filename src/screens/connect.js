import React, { Component } from 'react';
import {
  Linking,
  ScrollView,
  TouchableOpacity, StatusBar, Platform,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Icon, Screen, Image, View, Text, Tile, Title, Button, Divider, Heading } from '@shoutem/ui';

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
    TouchableOpacity,
    headerRight: <View />,  headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0,  height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  render = () => (
    <Screen>
      <ScrollableTabView
        tabBarBackgroundColor='#fff'
        tabBarTextStyle={{ paddingTop: 10, fontFamily: 'Akkurat-Regular', fontSize: 13, color: '#222222', lineHeight: 15 }}
        tabBarUnderlineStyle={{ height: 2, backgroundColor: '#ae956b' }}
      >
      <ScrollView tabLabel="About"
        automaticallyAdjustContentInsets={false}
      >
      <Image
        styleName='large-banner'
        source={require('../images/about.jpg')}
      >
        <Tile>
          <Title style={{ fontSize: 28, lineHeight: 32 }}>ABOUT US</Title>
        </Tile>
      </Image>
        <View style={{ paddingLeft: 35, paddingRight: 35 }} styleName='vertical'>
          <Divider />
          <Title styleName='textBelow'>Welcome to Grace on Campus!</Title>
          <Text>
              We are a ministry of Grace Community Church on the UCLA campus. We are a student group that exists to glorify God and spread a passion for His glory by making disciples, shepherding them to value Jesus Christ above all else, and training up the next generation of Christian leaders. In other words, we exist to edify and equip the saints, evangelize the lost, and exalt the Lord Jesus Christ in all things.
          </Text>
          <Divider />
          <Divider styleName="line" />
          <Divider />
          <Heading>Our Beliefs:</Heading>
          <Divider />
          <Title styleName='textBelow'>The Sinfulness of Man</Title>
          <Text>When man was first created, man was in a perfect relationship with God. However, man sinned and disobeyed God’s law, ruining and distorting the perfect relationship between God and man. The Bible says that every man is guilty of sin and has offended God. According to God’s absolutely holy and just character, He cannot approve of evil and declares that the punishment for sin is death and eternity spent in hell. However, in His loving kindness and mercy, He provided a way for man to be saved from the punishment of sin! </Text>
          <Divider />
          <Title styleName='textBelow'>God's Plan of Redemption</Title>
          <Text>God’s plan to save man from His wrath was carried out through Jesus Christ. God so loved the world that He sent his only Son that whoever believes in him shall not perish but have eternal life. In the face of persecution, suffering, and crucifixion, Jesus Christ never once gave into temptation and sinned. Instead, Jesus lived a completely righteous life and offered it up as a perfect sacrifice on behalf of all who would have faith in Him. Through Jesus’ death, God’s wrath is miraculously satisfied, the punishment is finally paid for, and man is fully forgiven of his sin. Three days after His crucifixion, Jesus resurrected victoriously from death, securing hope for all who would trust in Him. </Text>
          <Divider />
          <Title styleName='textBelow'>God's Call for Man to be Saved</Title>
          <Text>Saving faith in Christ is a gracious gift of God where the Holy Spirit transforms a person’s heart and opens his/her eyes to the gospel. At the same time, God calls every person to wholeheartedly repent from their sin, to believe in and commit his/her life to Jesus Christ.</Text>
          <Divider />
          <Divider />
          <Divider />
        </View>
      </ScrollView>
        <ScrollView tabLabel="Large Group"
          automaticallyAdjustContentInsets={false}
        >
          <Image
            styleName='large-banner'
            source={require('../images/largeGroupPhoto.jpg')}
          >
            <Tile>
              <Title style={{ fontSize: 28, lineHeight: 36 }}>Large Group</Title>
            </Tile>
          </Image>
          <View style={{ paddingLeft: 35, paddingRight: 35 }} styleName='vertical'>
            <Divider />
            <Title styleName='textBelow'>What is Large Group?</Title>
            <Text>
              Every Friday night we gather for a time of singing, hearing God's Word taught, and fellowship. It is during these weekly Large Group meetings that GOC comes together corporately to worship our great God.
            </Text>
            <Divider />
            <Title styleName='textBelow'>I want to attend Large Group!</Title>
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
          <Image
            styleName='large-banner'
            source={require('../images/smallGroupsPhoto.jpg')}
          >
            <Tile>
              <Title style={{ fontSize: 28, lineHeight: 32 }}>Small Groups</Title>
            </Tile>
          </Image>
          <Divider />
          <View style={{ paddingLeft: 35, paddingRight: 35 }} styleName='vertical'>
            <Title styleName='textBelow'>What are Small Groups?</Title>
            <Text>Small Groups are the backbone of our discipleship ministry. Each Small Group focuses on Bible study, prayer, fellowship, and accountability. In these smaller, more intimate groups, we have the opportunity to develop deep relationships so that we can better love, serve, and care for each other. Each Small Group has a leader who will minister to your spiritual needs, counsel you through life’s tough issues, and spur you on in your walk with the Lord.</Text>
            <Divider />
            <Title styleName='textBelow'>I want to join a Small Group!</Title>
            <Text>Awesome! Here are the Small Group leader blurbs. Feel free to contact any of the leaders about joining.</Text>
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
