import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { Icon, Text, Tile, View, Divider, Title, Screen, TextInput, FormGroup, Subtitle, Caption, Button, Spinner } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import { newPost } from '../../actions';

class addPost extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Change Password",
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="left-arrow" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.state = {
      Post: '',
      focus: null,
      success: false,
      loading: false,
    };
    this.onChangePost = this.onChangePost.bind(this);
  }

  onChangePost(Post) {
    this.setState({ submitted: false, Post });
  }


  updateInfo = () => {
    const {
      Post,
    } = this.state;
    this.setState({ loading: true });
    console.log("POST COMING");
    console.log(Post);
    this.props.newPost(Post);
    this.setState({ loading: false, success: true });
  }

  renderButton = () => {
    if (this.state.loading) {
      return (
        <Button style={{ marginBottom: 15, paddingVertical: 15 }}>
          <Spinner style={{ color: '#fff' }}/>
        </Button>
      );
    }

    if (this.state.success) {
      return (
        <Button style={{ marginBottom: 15 }} styleName='success'>
          <View styleName='horizontal h-center v-center fill-parent'><Text styleName="buttonText" style={{ paddingLeft: 15 }} >POSTED</Text><Icon style={{ color: '#fff', paddingLeft: 10, paddingVertical: 10, fontSize: 16, lineHeight: 13 }} name="checkbox-on" /></View>
        </Button>
      );
    }

    return (
      <Button style={{ marginBottom: 15 }} onPress={this.updateInfo}>
        <Text>ADD POST</Text>
      </Button>
    );
  }

  render = () => {
    const {
      Post,
      focus
    } = this.state;
    return (
      <Screen>
        <KeyboardAwareScrollView ref={(c) => { this.scroll = c; }}>
          <Tile style={{ paddingTop: 20, paddingBottom: 0, flex: 0.8, backgroundColor: 'transparent' }} styleName='text-centric'>
            <Title>Add New Post</Title>
            <Subtitle>Create a new Announcement to be notified to everyone in GOC</Subtitle>
            <Subtitle style={{ color: '#b40a34', paddingVertical: 10 }} >{this.props.error}</Subtitle>
          </Tile>
          <FormGroup>
            <Caption>Post</Caption>
            { focus === 'one' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'one' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="New Post"
                value={Post}
                onChangeText={this.onChangePost}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'one' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="New Post"
                value={Post}
                onChangeText={this.onChangePost}
                returnKeyType='next'
              />
            }
            <Divider />
            <View style={{ flex: 0.25 }} styleName='vertical h-center v-end'>
              {this.renderButton()}
            </View>
          </FormGroup>
          <Divider />
          <Divider />
          <Divider />
        </KeyboardAwareScrollView>
      </Screen>
    );
  }
}

const mapStateToProps = ({ HomeReducer }) => {
  const { postData } = HomeReducer;
  return { postData };
};

export default connect(mapStateToProps, { newPost })(addPost);
