import React, { Component } from 'react';
import { TouchableOpacity, StatusBar, Platform, ScrollView, Linking } from 'react-native';
import { Screen, Caption, Image, View, Subtitle, Icon, Button, Text } from '@shoutem/ui';
import { connect } from 'react-redux';
import { getUserPerm } from '../../actions';

class Post extends Component {
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

    parseAndFindURLs(summary) {
      // Can only add one link per event description using this method
      const re = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
      let url = '';
      let link = ''; // in event url does not start with https://
      url = summary.match(re);
      if (url) {
        url = url[0].trim();
        link = url;
        var prefix = 'https://';
        if (url.substr(0, prefix.length) !== prefix)
          link = prefix + link;
      }
      if (url != '') {
        var text = summary.split(url);
        return ([text[0], link, text[1]]);
      }
      return ([summary, '', '']);
    }

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
        this.props.getUserPerm();
    }

    componentWillReceiveProps = (nextProps) => {
        const data = nextProps.userInfo;
        this.setState({
            userInfo: data
        });
    }

    render() {
      const { announcement } = this.props.navigation.state.params;
      let image;
      const description = this.parseAndFindURLs(announcement.post);
      if (announcement.role === 'Grace on Campus') image = require('../../images/notification-icon.png');
      else if (announcement.role === 'Chris Gee') image = require('../../images/chrisgee.jpg');
      return (

        <Screen>
        {
            (this.state.userInfo != null && this.state.userInfo.admin === 1) &&
            <View style={{ padding: 25 }} styleName='vertical h-center v-end'>
               <Button onPress={() => this.props.navigation.navigate('editPost', { announcement })}>
                 <Text>EDIT POST</Text>
               </Button>
             </View>
        }
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
              <Subtitle>{description[0]}</Subtitle>
              { (description[1] != null) &&
               <Subtitle style={{ color: '#ae956b' }} onPress={() => Linking.openURL(description[1])} >
                 {description[1]}
               </Subtitle>
             }
             <Subtitle>{description[2]}</Subtitle>
            </View>
          </ScrollView>
        </Screen>
      );
    }
}

const mapStateToProps = ({ HomeReducer }) => {
    const { userInfo } = HomeReducer;
    return { userInfo };
}

export default connect(mapStateToProps, { getUserPerm })(Post);
