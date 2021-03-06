import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, StatusBar, Platform, AsyncStorage } from 'react-native';
import { Screen, Caption, Divider, Spinner, Row, Image, View, Subtitle, Icon, Text, Button } from '@shoutem/ui';
import { connect } from 'react-redux';
import { postFetch, getUserPerm, setReadList } from '../../actions';
import { getToken } from '../../utility';

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Announcements',
    }),
    title: 'ANNOUNCEMENTS',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerRight: <View />,
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0, height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      userInfo: {},
      readList: null,
    };
    this.props.getUserPerm();
    this.props.postFetch();

    this.setRead = this.setRead.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  componentWillMount() {
    this.props.postFetch();
    getToken();
    AsyncStorage.getItem('read').then((readList) => {
      if (readList) this.setState({ readList: JSON.parse(readList) });
      else this.setState({ readList: [] });
    });
  }

  componentWillReceiveProps = (nextProps) => {
    const posts = nextProps.postData;
    const data = nextProps.userInfo;
    this.setState({
      postData: posts,
      userInfo: data,
    });
  }

  setRead(announcement) {
    let result = false;
    this.state.readList.forEach((item) => {
      if (item === announcement.key) result = true;
    });
    if (!result) {
      const newList = this.state.readList;
      newList.push(announcement.key);
      this.setState({ readList: newList });
      this.props.setReadList(newList);
    }
    this.props.navigation.navigate('Post', { announcement });
  }

  renderRow() {
    return this.state.postData.map((announcement) => {
      let result = false;
      this.state.readList.forEach((item) => {
        if (item === announcement.key) result = true;
      });
      let image;
      if (announcement.role === 'Grace on Campus') image = require('../../images/notification-icon.png');
      else if (announcement.role === 'Chris Gee') image = require('../../images/chrisgee.jpg');
      return (
        <TouchableOpacity key={announcement.key} onPress={() => this.setRead(announcement)}>
          <Row>
            <View style={{ flex: 1 }} styleName="horizontal v-start">
              <View style={{ flex: 0.9 }} styleName="vertical">
                <View styleName="horizontal v-center">
                  <Image style={{ width: 25, height: 25, marginRight: 8 }} styleName="small-avatar" source={image} />
                  <View styleName='vertical'>
                    <Subtitle style={{ marginBottom: 2, fontSize: 14, lineHeight: 18, fontFamily: 'Akkurat-Bold' }}>{announcement.role}</Subtitle>
                    <Caption style={{ lineHeight: 15 }} >{announcement.time}</Caption>
                  </View>
                </View>
                <View style={{ marginTop: 12 }} styleName="vertical">
                  <Subtitle style={{ fontFamily: 'Akkurat-Bold', marginBottom: 5 }} styleName="bold">{announcement.title}</Subtitle>
                  <Subtitle numberOfLines={2} ellipsizeMode='tail'>{announcement.post}</Subtitle>
                </View>
              </View>
              { !result ?
                <View styleName="vertical stretch space-between h-end" style={{ flex: 0.1 }}>
                  <View style={{ width: 8, height: 8, marginRight: 3, borderRadius: 4, backgroundColor: '#617cce' }} styleName="notification-dot" />
                  <Icon style={{ fontSize: 22, opacity: 0.5, marginRight: -4 }} styleName="disclosure" name="right-arrow" />
                  <View style={{ width: 8, height: 8, marginRight: 3, marginTop: 3, borderRadius: 4, borderWidth: 0.8, opacity: 0 }} styleName="notification-dot" />
                </View>
                :
                <View styleName="vertical stretch space-between h-end" style={{ flex: 0.1 }}>
                  <View style={{ width: 8, height: 8, marginRight: 3, borderRadius: 4, borderWidth: 0.8, borderColor: '#617cce' }} styleName="notification-dot" />
                  <Icon style={{ fontSize: 22, opacity: 0.5, marginRight: -4 }} styleName="disclosure" name="right-arrow" />
                  <View style={{ width: 8, height: 8, marginRight: 3, marginBottom: 3, borderRadius: 4, borderWidth: 0.8, opacity: 0 }} styleName="notification-dot" />
                </View>
              }
            </View>
          </Row>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    });
  }

  render() {
    if ((this.state.postData && this.state.postData.length && this.state.readList)) {
      return (
        <Screen>
          {
            (this.state.userInfo != null && this.state.userInfo.admin === 1) &&
             <View style={{ padding: 25 }} styleName='vertical h-center v-end'>
               <Button onPress={() => this.props.navigation.navigate('AddPost')}>
                 <Text>ADD POST</Text>
               </Button>
             </View>
          }

          <Divider styleName="section-header">
            <Caption>Announcements</Caption>
          </Divider>
          <ScrollView>
            { this.renderRow() }
          </ScrollView>
        </Screen>
      );
    }
    return (
      <Screen>
        <View styleName='vertical fill-parent v-center h-center'>
          <Spinner size="large" />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ HomeReducer }) => {
  const { postData, userInfo } = HomeReducer;
  return { postData, userInfo };
};

export default connect(mapStateToProps, { getUserPerm, postFetch, setReadList })(Home);
