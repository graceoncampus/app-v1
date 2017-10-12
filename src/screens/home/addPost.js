import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform,
  TextInput,
  Picker,
  Alert
} from 'react-native';
import { Icon, Text, Tile, View, Divider, Title, TextInput as TInput, Screen, FormGroup, Subtitle, Caption, Button, Spinner } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import { newPost } from '../../actions';

class addPost extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      Post: '',
      focus: null,
      success: false,
      loading: false,
      height: 60,
      title: '',
      selected: 'Grace on Campus',
    };
    this.onChangePost = this.onChangePost.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  onChangePost(Post) {
    this.setState({ submitted: false, Post });
  }

  onChangeTitle(title) {
    this.setState({ submitted: false, title });
  }

  confirmPost = () => {
    Alert.alert(
      'Confirm Post',
      'Are you sure you want to post?',
      [
        {text: 'Confirm', onPress: this.updateInfo },
        {text: 'Cancel', onPress: () => console.log('OK Pressed!')},
      ]
    )
  }

  updateInfo = () => {
    const {
      Post,
      selected,
      title,
    } = this.state;
    console.log("HELLO");
    console.log(selected);
    this.setState({ loading: true });
    this.props.newPost(Post, title, selected);
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
      <Button style={{ marginBottom: 15 }} onPress={this.confirmPost}>
        <Text>ADD POST</Text>
      </Button>
    );
  }

  render = () => {
    const {
      Post,
      focus,
      title,
    } = this.state;
    return (
      <Screen>
        <KeyboardAwareScrollView>
          <Tile style={{ paddingTop: 20, paddingBottom: 0, flex: 0.8, backgroundColor: 'transparent' }} styleName='text-centric'>
            <Title>Add New Post</Title>
            <Subtitle>Create a new Announcement to be notified to everyone in GOC</Subtitle>
            <Subtitle style={{ color: '#b40a34', paddingVertical: 10 }} >{this.props.error}</Subtitle>
          </Tile>
          <FormGroup>
          <Caption>Title</Caption>
            { focus === 'two' ?
              <TInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'two' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Title"
                value={title}
                onChangeText={this.onChangeTitle}
                returnKeyType='next'
              />
              :
              <TInput
                onFocus={() => this.setState({ focus: 'two' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Title"
                value={title}
                onChangeText={this.onChangeTitle}
                returnKeyType='next'
              />
            }
            <Caption>Post</Caption>
            { focus === 'one' ?
              <TextInput
                multiline={true}
                onFocus={() => this.setState({ focus: 'one' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                numberOfLines = {4}
                style={{
                  borderWidth: 1,
                  borderColor: '#ae956b',
                  backgroundColor: '#fff',
                  marginTop: 3,
                  fontFamily: 'Akkurat-Regular',
                  paddingVertical: 9,
                  paddingHorizontal: 15,
                  borderRadius: 1,
                  height: Math.max(60, this.state.height),
                }}
                onContentSizeChange={({ nativeEvent: { contentSize: { height } } }) => {
                  this.setState({
                    height: height + 16,
                  });
                }}
                onChange={(event) => {
                  this.setState({
                    Post: event.nativeEvent.text,
                  });
                }}
                value={Post}
              />
              :
              <TextInput
                multiline={true}
                onFocus={() => this.setState({ focus: 'one' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                numberOfLines = {4}
                style={{
                  borderWidth: 1,
                  borderColor: '#dfe0e3',
                  fontFamily: 'Akkurat-Regular',
                  paddingVertical: 9,
                  paddingHorizontal: 15,
                  borderRadius: 1,
                  height: Math.max(60, this.state.height),
                }}
                onContentSizeChange={({ nativeEvent: { contentSize: { height } } }) => {
                  this.setState({
                    height: height + 16,
                  });
                }}
                onChange={(event) => {
                  this.setState({
                    Post: event.nativeEvent.text,
                  });
                }}
                value={Post}
              />
            }
            <Caption>Post As</Caption>
            <Picker
              itemStyle={{ height: 120 }}
              selectedValue={this.state.selected}
              onValueChange={selected => this.setState({ selected })}>
              <Picker.Item label="Grace on Campus" value="Grace on Campus" />
              <Picker.Item label="Chris Gee" value="Chris Gee" />
            </Picker>
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
