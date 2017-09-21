import React, { Component } from 'react';
import {
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Icon, View, Divider, Heading, Title, Text, Screen, Image, Tile } from '@shoutem/ui';


class About extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'About',
    }),
    title: 'ABOUT',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { paddingTop: 16, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },

  })

  render = () => (
    <Screen>
      <ScrollView>
      <Image
        styleName='large-banner'
        source={require('../images/about.jpg')}
      >
        <Tile>
          <Title style={{ fontSize: 28 }}>ABOUT US</Title>
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
    </Screen>
  )
}

export default About;
