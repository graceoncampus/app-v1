import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform,
  ScrollView,
} from 'react-native';
import { Icon, Divider, Image, Title, View, Screen, Text, Caption } from '@shoutem/ui';

class leaderScreens extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Leadership',
    }),
    title: 'LEADERSHIP',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Icon name='back' style={{ paddingLeft: 10 }} />
      </TouchableOpacity>
    ),
    headerRight: <View />,  headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0, height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })
  render = () => {
    const { image, summary, title, email, position } = this.props.navigation.state.params.leader;
    return (
      <Screen>
        <ScrollView>
          <Divider />
          <View styleName='vertical h-center'>
            <Image
              style={{ width: 150, height: 150, marginBottom: 10, borderRadius: 75, borderWidth: 4, borderColor: 'white' }}
              source={image}
            />
            <Title>{title}</Title>
            {position &&
              <Caption>{position}</Caption>
            }
            {email &&
              <Caption>{email}</Caption>
            }
          </View>
          <Divider />
          <View style={{ borderTopWidth: 1, borderTopColor: '#ecedef', backgroundColor: 'white', paddingTop: 35, paddingHorizontal: 35, paddingBottom: 50 }}>
            <Text>
              {summary}
            </Text>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

export default leaderScreens;
