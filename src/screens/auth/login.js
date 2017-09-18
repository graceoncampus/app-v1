import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Tile, Divider, Icon, Screen, TextInput, Subtitle, FormGroup, Caption, Button, Spinner, Title } from '@shoutem/ui';
import { connect } from 'react-redux';

import { userLogin } from '../../actions';

class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'LOG IN',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Icon name='back' style={{ paddingLeft: 10 }} />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      submitted: false,
      loading: false,
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onButtonPress() {
    const { Email, Password } = this.state;
    this.setState({ submitted: true });
    if (Email !== '' && Password !== '') {
      this.setState({ loading: true });
      this.props.userLogin({ Email, Password });
    } else {
      this.setState({ loading: false });
    }
  }

  onChangeEmail(Email) {
    this.setState({ submitted: false });
    this.setState({ Email });
  }

  onChangePassword(Password) {
    this.setState({ submitted: false });
    this.setState({ Password });
  }

  renderButton() {
    if (this.state.loading && this.props.loading !== false) {
      return (
        <Button style={{ paddingVertical: 15 }}>
          <Spinner style={{ color: '#fff' }}/>
        </Button>
      );
    }

    return (
      <Button onPress={this.onButtonPress}>
        <Text>LOG IN</Text>
      </Button>
    );
  }

  render() {
    let error = ' ';
    const { focus, Email, Password, submitted } = this.state;
    if (submitted) {
      if (Email === '') { error = 'Please enter your email'; }
      if (Password === '') {
        if (error !== ' ') { error += ' and password'; } else error = 'Please enter your password';
      }
    }

    if (this.props.error === 'auth/wrong-password') { error = "Looks like that's the wrong -password"; }
    if (this.props.error === 'auth/invalid-email') { error = "That doesn't look like an email address"; }
    return (
      <Screen>
        <Tile style={{ paddingTop: 20, paddingBottom: 0, flex: 0.2, backgroundColor: 'transparent' }} styleName='text-centric'>
          <Title>Welcome Back!</Title>
          <Subtitle>Login to get started</Subtitle>
          <Subtitle style={{ color: '#b40a34', paddingVertical: 10 }} >{error}</Subtitle>
        </Tile>
        <FormGroup style={{ flex: 0.6 }}>
          <Caption>Email</Caption>
          { focus === 'one' ?
            <TextInput
              styleName='focused'
              onFocus={() => this.setState({ focus: 'one' })}
              onSubmitEditing={() => this.setState({ focus: '' })}
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Email'
              keyboardType='email-address'
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
              placeholder='Email'
              keyboardType='email-address'
              value={Email}
              onChangeText={this.onChangeEmail}
              returnKeyType='next'
            />
          }
          <Caption>Password</Caption>
          { focus === 'two' ?
            <TextInput
              styleName='focused'
              onFocus={() => this.setState({ focus: 'two' })}
              onSubmitEditing={
                () => {
                  this.onButtonPress();
                  this.setState({ focus: '' });
                }
              }
              placeholder='Password'
              value={Password}
              secureTextEntry
              onChangeText={this.onChangePassword}
              returnKeyType='done'
            />
            :
            <TextInput
              onFocus={() => this.setState({ focus: 'two' })}
              onSubmitEditing={
                () => {
                  this.onButtonPress();
                  this.setState({ focus: '' });
                }
              }
              placeholder='Password'
              value={Password}
              secureTextEntry
              onChangeText={this.onChangePassword}
              returnKeyType='done'
            />
          }
          <Divider />
          {this.renderButton()}
          <Divider />
          <Divider />
        </FormGroup>
      </Screen>
    );
  }
}

const mapStateToProps = ({ AuthReducer }) => {
  const { user, error, loading, userInfo } = AuthReducer;
  return { user, error, loading, userInfo };
};

export default connect(mapStateToProps, { userLogin })(Login);
