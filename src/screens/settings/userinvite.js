import React, { Component } from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import { Icon, Text, Tile, View, Divider, Title, Screen, TextInput, FormGroup, Subtitle, Caption, Button, Spinner } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class UserInvite extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Invite New User',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="back" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);

    this.state = {
      Email: '',
      focus: null,
      loading: false,
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  onChangeEmail(Email) {
    this.setState({ submitted: false, Email });
  }

  signUp = () => {
    this.setState({ loading: true });
    const {
      Email,
    } = this.state;
    const lowercaseEmail = Email.toLowerCase();
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (re.test(lowercaseEmail)) {
      firebase.database().ref('invitedUsers').orderByChild('email').equalTo(lowercaseEmail)
        .once('value', (snapshot) => {
          const emailCheck = snapshot.val();
          if (emailCheck) {
            this.setState({ loading: false });
          } else {
            firebase.database().ref('users').orderByChild('email').equalTo(lowercaseEmail)
              .once('value', (snap) => {
                const existingUser = snap.val();
                if (existingUser) {
                  this.setState({ loading: false });
                } else {
                  const postData = {
                    email: lowercaseEmail,
                  };
                  const userInvite = firebase.database().ref('invitedUsers');
                  userInvite.push(postData);
                  this.setState({ loading: false });
                }
              });
          }
        });
    } else {
      this.setState({ loading: false });
    }
  }

    renderButton = () => {
      if (this.state.loading) {
        return (
          <Button style={{ marginBottom: 15, paddingVertical: 15 }}>
            <Spinner style={{ color: '#fff' }}/>
          </Button>
        );
      }

      return (
        <Button style={{ marginBottom: 15 }} onPress={this.signUp}>
          <Text>INVITE USER</Text>
        </Button>
      );
    }

    render = () => {
      const {
        Email,
        focus,
      } = this.state;
      return (
        <Screen>
          <KeyboardAwareScrollView ref={(c) => { this.scroll = c; }}>
            <Tile style={{ paddingTop: 20, paddingBottom: 0, flex: 0.8, backgroundColor: 'transparent' }} styleName='text-centric'>
              <Title>Invite New User</Title>
              <Subtitle>Invite a new user to create an account. Note that the email you invite will be their log in email</Subtitle>
              <Subtitle style={{ color: '#b40a34', paddingVertical: 10 }} >{this.props.error}</Subtitle>
            </Tile>
            <FormGroup>
              <Caption>Email</Caption>
              { focus === 'one' ?
                <TextInput
                  styleName='focused'
                  onFocus={() => this.setState({ focus: 'one' })}
                  onSubmitEditing={() => this.setState({ focus: '' })}
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder="yourbestfriend@gmail.com"
                  keyboardType="email-address"
                  value={Email}
                  onChangeText={this.onChangeEmail}
                  returnKeyType='next'
                />
                :
                <TextInput
                  onFocus={() => this.setState({ focus: 'one' })}
                  onSubmitEditing={() => this.setState({ focus: '' })}
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder="yourbestfriend@gmail.com"
                  keyboardType="email-address"
                  value={Email}
                  onChangeText={this.onChangeEmail}
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

export default UserInvite;
