import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform,
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
    headerRight: <View />,
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0, height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
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
            alert('This email has already been invited');
            this.setState({ loading: false });
          } else {
            firebase.database().ref('users').orderByChild('email').equalTo(lowercaseEmail)
              .once('value', (snap) => {
                const existingUser = snap.val();
                if (existingUser) {
                  alert('An account with this email address has already been created');
                  this.setState({ loading: false });
                } else {
                  const details = {
                    token: 'GOC2017!',
                    email: lowercaseEmail,
                  };
                  let formBody = [];
                  for (const property in details) {
                    const encodedKey = encodeURIComponent(property);
                    const encodedValue = encodeURIComponent(details[property]);
                    formBody.push(`${encodedKey}=${encodedValue}`);
                  }
                  formBody = formBody.join('&');
                  fetch('https://graceoncampus.org/invitation', {
                    method: 'post',
                    body: formBody,
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                  }).then(this.setState({ loading: false }));
                }
              });
          }
        });
    } else {
      alert('Please enter a valid email address');
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
