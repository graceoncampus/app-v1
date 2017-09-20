import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Divider, Screen, Caption, Spinner, View, Subtitle, Icon, Text, Button } from '@shoutem/ui';
import { connect } from 'react-redux';
import { getUserPerm, postFetch } from '../../actions';


class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Home',
    }),
    title: 'HOME',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      userInfo: {},
    };
    this.props.getUserPerm();
    this.props.postFetch();
  }

  componentWillReceiveProps = (nextProps) => {
    const posts = nextProps.postData;
    const data = nextProps.userInfo;
    this.setState({
      postData: posts,
      userInfo: data,
      isRefreshing: false,
    });
  }

  renderPosts() {
    return this.state.postData.map((post, i) => {
      if (i % 2 === 0) {
        return (
          <View style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#fff' }} styleName='horizontal space-between v-start' key={i}>
            <Subtitle style={{ textAlign: 'right' }}>{post.time}</Subtitle>
            <Subtitle style={{ textAlign: 'right' }}>{post.date}</Subtitle>
            <Subtitle style={{ textAlign: 'right' }}>{post.post}</Subtitle>
          </View>
        );
      }
      return (
        <View style={{ paddingVertical: 10, paddingHorizontal: 15 }} styleName='horizontal space-between v-start' key={i}>
          <Subtitle style={{ textAlign: 'right' }}>{post.time}</Subtitle>
          <Subtitle style={{ textAlign: 'right' }}>{post.date}</Subtitle>
          <Subtitle style={{ textAlign: 'right' }}>{post.post}</Subtitle>
        </View>
      );
    });
  }

  render() {
    return (
      <Screen>
        <View styleName='vertical h-center v-end'>
          {
            (this.state.userInfo != null) ?
            ((this.state.userInfo.courses) ? <Button style={{ marginBottom: 15 }} onPress={() => this.props.navigation.navigate('AddPost')}>
              <Text>ADD POST</Text>
            </Button> : <Text/>) : <Text/>
        }
        </View>
        <Divider styleName="section-header">
          <Caption>Time</Caption>
          <Caption>Post</Caption>
        </Divider>
        {
          this.state.postData.length ?
            <ScrollView>
              {this.renderPosts()}
            </ScrollView>
            :
            <View styleName='vertical fill-parent v-center h-center'>
              <Spinner size='large'/>
            </View>
        }
      </Screen>
    );
  }
}


const mapStateToProps = ({ HomeReducer }) => {
  const { postData, userInfo } = HomeReducer;
  return { postData, userInfo };
};

export default connect(mapStateToProps, { getUserPerm, postFetch })(Home);
