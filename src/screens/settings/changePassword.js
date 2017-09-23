import React, { Component } from 'react';
import { TouchableOpacity, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Text, Tile, View, Divider, Title, Screen, TextInput, FormGroup, Caption, Button, Spinner } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { changeUserPassword } from '../../actions';

class ChangePassword extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Change Password',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="back" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerRight: <View />,  headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0,  height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      focus: null,
    };
    this.onChangeOld = this.onChangeOld.bind(this);
    this.onChangeNew = this.onChangeNew.bind(this);
    this.onChangeConfirm = this.onChangeConfirm.bind(this);
  }

  onChangeOld(oldPassword) {
    this.setState({ submitted: false, oldPassword });
  }

  onChangeNew(newPassword) {
    this.setState({ submitted: false, newPassword });
  }

  onChangeConfirm(confirmNewPassword) {
    this.setState({ submitted: false, confirmNewPassword });
  }

  change = () => {
    const {
      oldPassword,
      newPassword,
      confirmNewPassword,
    } = this.state;
    if (newPassword.length < 6) {
      this.setState({ newPassword: '', confirmNewPassword: '' });
    } else if (newPassword !== confirmNewPassword) {
      this.setState({ newPassword: '', confirmNewPassword: '' });
    } else {
      this.props.changeUserPassword(oldPassword, newPassword);
      this.setState({ loading: false });
    }
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
      <Button style={{ marginBottom: 15 }} onPress={this.change}>
        <Text>CHANGE PASSWORD</Text>
      </Button>
    );
  }

render = () => {
  const {
    oldPassword,
    newPassword,
    confirmNewPassword,
    focus,
  } = this.state;
  return (
    <Screen>
      <KeyboardAwareScrollView ref={(c) => { this.scroll = c; }}>
        <Tile style={{ paddingTop: 20, paddingBottom: 0, flex: 0.8, backgroundColor: 'transparent' }} styleName='text-centric'>
          <Title>Change Your Password</Title>
        </Tile>
        <FormGroup>
          <Caption>Old Password</Caption>
          { focus === 'one' ?
            <TextInput
              styleName='focused'
              onFocus={() => this.setState({ focus: 'one' })}
              onSubmitEditing={() => this.setState({ focus: '' })}
              value={oldPassword}
              onChangeText={this.onChangeOld}
              returnKeyType='next'
              secureTextEntry={true}
            />
            :
            <TextInput
              onFocus={() => this.setState({ focus: 'one' })}
              onSubmitEditing={() => this.setState({ focus: '' })}
              value={oldPassword}
              onChangeText={this.onChangeOld}
              returnKeyType='next'
              secureTextEntry={true}
            />
          }
          <Caption>New Password</Caption>
          { focus === 'two' ?
            <TextInput
              styleName='focused'
              onFocus={() => this.setState({ focus: 'two' })}
              onSubmitEditing={() => this.setState({ focus: '' })}
              value={newPassword}
              onChangeText={this.onChangeNew}
              returnKeyType='next'
              secureTextEntry={true}
            />
            :
            <TextInput
              onFocus={() => this.setState({ focus: 'two' })}
              onSubmitEditing={() => this.setState({ focus: '' })}
              value={newPassword}
              onChangeText={this.onChangeNew}
              returnKeyType='next'
              secureTextEntry={true}
            />
          }
          <Caption>Confirm New Password</Caption>
          { focus === 'six' ?
            <TextInput
              styleName='focused'
              onFocus={() => this.setState({ focus: 'six' })}
              onSubmitEditing={() => this.setState({ focus: '' })}
              value={confirmNewPassword}
              onChangeText={this.onChangeConfirm}
              returnKeyType='next'
              secureTextEntry={true}
            />
            :
            <TextInput
              onFocus={() => this.setState({ focus: 'six' })}
              onSubmitEditing={() => this.setState({ focus: '' })}
              value={confirmNewPassword}
              onChangeText={this.onChangeConfirm}
              returnKeyType='next'
              secureTextEntry={true}
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
  const { user, userInfo, loading } = AuthReducer;

  return { user, userInfo, loading };
};

export default connect(mapStateToProps, { changeUserPassword })(ChangePassword);
