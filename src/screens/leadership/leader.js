import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Icon, Divider, Image, Title, Tile, View, Screen, Text, Caption } from '@shoutem/ui';

import AppStyles from '../../styles';

class leaderScreens extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.leader.title.toUpperCase(),
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Icon name='back' style={{ paddingLeft: 10 }} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: "#222222", lineHeight: 18 }
  })

  constructor(props) {
    super(props);
    this.state = {
      splashScreenVisible: this.props.showSplashScreen || false,
    };
  }
  
  render = () => {
    const { image, summary, title, email, position } = this.props.navigation.state.params.leader;
    return (
      <Screen>
        <ScrollView>
          <Divider />        
          <View styleName='vertical h-center'>
            <Image
              style={{ width: 150, height: 150, marginBottom: 10, borderRadius: 75, borderWidth: 4, borderColor: 'white'}}
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
          <View style={{borderTopWidth: 1, borderTopColor: '#ecedef', backgroundColor: 'white', paddingTop: 35, paddingHorizontal: 35, paddingBottom: 50}}>
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
