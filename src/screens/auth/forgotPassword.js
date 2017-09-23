import React, { Component } from 'react';
import { TouchableOpacity, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Text, Tile, View, Divider, Title, Screen, TextInput, FormGroup, Subtitle, Caption, Button, Spinner } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { resetUserPassword } from '../../actions';

class ForgotPassword extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'FORGOT PASSWORD',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Icon name='back' style={{ paddingLeft: 10 }} />
      </TouchableOpacity>
    ),
    headerRight: <View />,  headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0,  height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },

  })

  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      Email: '',
      focus: null,
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }

  onChangeEmail(Email) {
    this.setState({ submitted: false, Email });
  }

  reset = () => {
    const { Email } = this.state;
    this.props.resetUserPassword(Email);
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <Button style={{ marginBottom: 15, paddingVertical: 15 }}>
          <Spinner style={{ color: '#fff' }}/>
        </Button>
      );
    }

    return (
      <Button style={{ marginBottom: 15 }} onPress={this.reset}>
        <Text>RESET PASSWORD</Text>
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
          <Title>Reset Password</Title>
          <Subtitle>Please enter the email address for your GOC account. An email will be sent to your email address indicating instructions on how to reset your password</Subtitle>
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
              placeholder="YourEmailAddress@gmail.com"
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
              placeholder="YourEmailAddress@gmail.com"
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


const mapStateToProps = ({ AuthReducer }) => {
  const { user, error, loading, userInfo } = AuthReducer;

  return { user, error, loading, userInfo };
};

export default connect(mapStateToProps, { resetUserPassword })(ForgotPassword);
