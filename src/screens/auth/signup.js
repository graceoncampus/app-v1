import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Text, Tile, Divider, Title, Screen, TextInput, FormGroup, Subtitle, Caption, Button, Spinner } from '@shoutem/ui';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';

import { createAccount } from '../../actions';

class Signup extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'SIGN UP',
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
      Confirm_password: '',
      First_name: '',
      Last_name: '',
      Phone_number: '',
      Birthday: '',
      Graduation_year: '',
      Major: '',
      Home_church: '',
      Address: '',
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeGraduationYear = this.onChangeGraduationYear.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeHomeChurch = this.onChangeHomeChurch.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    this.setState({ loading: true });
    this.setState({ error: false });
    const {
      Email,
      Password,
      Confirm_password,
      First_name,
      Last_name,
      Phone_number,
      Birthday,
      Graduation_year,
      Major,
      Home_church,
      Address,
    } = this.state;

    let error = false;
    if (First_name === '' || Last_name === '' || Email === '' || Password === '' || Confirm_password === '') {
      this.setState({ error: true });
      error = true;
    }
    if (Confirm_password !== Password) {
      this.setState({ error: 'passwords' });
      error = true;
    }
    if (!error) {
      this.props.createAccount(
        Email,
        Password,
        First_name,
        Last_name,
        Phone_number,
        Birthday,
        Graduation_year,
        Major,
        Home_church,
        Address,
      );
    } else {
      this.scroll.scrollToPosition(0, 0, true);
    }
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
      <Button onPress={this.signUp}>
        <Text>SIGN UP</Text>
      </Button>
    );
  }

  onChangeEmail(Email) {
    this.setState({ submitted: false, Email });
  }

  onChangePassword(Password) {
    this.setState({ submitted: false, Password });
  }

  onChangeConfirmPassword(Confirm_password) {
    this.setState({ submitted: false, Confirm_password });
  }

  onChangeFirstName(First_name) {
    this.setState({ submitted: false, First_name });
  }

  onChangeLastName(Last_name) {
    this.setState({ submitted: false, Last_name });
  }

  onChangePhoneNumber(Phone_number) {
    this.setState({ submitted: false, Phone_number });
  }

  onChangeBirthday(Birthday) {
    this.setState({ submitted: false, Birthday });
  }

  onChangeGraduationYear(Graduation_year) {
    this.setState({ submitted: false, Graduation_year });
  }

  onChangeMajor(Major) {
    this.setState({ submitted: false, Major });
  }

  onChangeHomeChurch(Home_church) {
    this.setState({ submitted: false, Home_church });
  }

  onChangeAddress(Address) {
    this.setState({ submitted: false, Address });
  }

  render() {
    let error = ' ';
    if (this.state.error) {
      error = 'Please fill out all fields.';
    }
    if (this.state.error === 'passwords') {
      error = 'Passwords do not match.';
    }
    if (this.props.error) error = this.props.error;
    const {
      focus,
      Email,
      Password,
      Confirm_password,
      First_name,
      Last_name,
      Phone_number,
      Birthday,
      Graduation_year,
      Major,
      Home_church,
      Address,
    } = this.state;
    return (
      <Screen>
        <KeyboardAwareScrollView ref={(c) => { this.scroll = c; }}>
          <Tile style={{ paddingTop: 20, paddingBottom: 0, flex: 0.8, backgroundColor: 'transparent' }} styleName='text-centric'>
            <Title>Greetings!</Title>
            <Subtitle>
              Creating an account and providing us with some basic info allows you to sign up for rides, classes, and events.
            </Subtitle>
            <Subtitle style={{ color: '#b40a34', paddingVertical: 10 }} >{error}</Subtitle>
          </Tile>
          <FormGroup>
            <Caption>First Name</Caption>
            { focus === 'one' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'one' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="John"
                value={First_name}
                onChangeText={this.onChangeFirstName}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'one' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="John"
                value={First_name}
                onChangeText={this.onChangeFirstName}
                returnKeyType='next'
              />
            }
            <Caption>Last Name</Caption>
            { focus === 'two' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'two' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="the Baptist"
                value={Last_name}
                onChangeText={this.onChangeLastName}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'two' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="the Baptist"
                value={Last_name}
                onChangeText={this.onChangeLastName}
                returnKeyType='next'
              />
            }
            <Caption>Email</Caption>
            { focus === 'three' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'three' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder="youhavenotbeenbaptized@gmail.com"
                keyboardType="email-address"
                value={Email}
                onChangeText={this.onChangeEmail}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'three' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder="youhavenotbeenbaptized@gmail.com"
                keyboardType="email-address"
                value={Email}
                onChangeText={this.onChangeEmail}
                returnKeyType='next'
              />
            }
            <Caption>Password</Caption>
            { focus === 'four' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'four' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Password"
                value={Password}
                secureTextEntry
                onChangeText={this.onChangePassword}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'four' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Password"
                value={Password}
                secureTextEntry
                onChangeText={this.onChangePassword}
                returnKeyType='next'
              />
            }
            <Caption>Confirm Password</Caption>
            { focus === 'five' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'five' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Confirm Password"
                value={Confirm_password}
                secureTextEntry
                onChangeText={this.onChangeConfirmPassword}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'five' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Confirm Password"
                value={Confirm_password}
                secureTextEntry
                onChangeText={this.onChangeConfirmPassword}
                returnKeyType='next'
              />
            }
            <Caption>Birthday</Caption>
            { focus === 'eight' ?
              <DatePicker
                date={Birthday}
                onOpenModal={() => this.setState({ focus: 'eight' })}
                style={{ width: '100%' }}
                mode="date"
                placeholder="Tap to Select Birthday"
                format="MM/DD/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateTouchBody: {
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 1,
                    borderColor: '#617cce',
                    marginTop: 3,
                    height: 50,
                  },
                  placeholderText: {
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: '#888888',
                    opacity: 0.8,
                  },
                  dateInput: {
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    alignItems: 'flex-start',
                    paddingVertical: 9,
                    paddingHorizontal: 15,
                  },
                  dateText: {
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: '#666666',
                  },
                  btnText: {
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                  },
                  btnTextConfirm: {
                    fontSize: 16,
                    color: '#659CEC',
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                  },
                  btnTextCancel: {
                    fontSize: 16,
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                  },
                }}
                onDateChange={(bday) => { this.setState({ Birthday: bday }); }}
              />
              :
              <DatePicker
                date={Birthday}
                onOpenModal={() => this.setState({ focus: 'eight' })}
                style={{ width: '100%' }}
                mode="date"
                placeholder="Tap to Select Birthday"
                format="MM/DD/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateTouchBody: {
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 1,
                    borderColor: '#dfe0e3',
                    marginTop: 3,
                    height: 50,
                  },
                  placeholderText: {
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: '#888888',
                    opacity: 0.8,
                  },
                  dateInput: {
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    alignItems: 'flex-start',
                    paddingVertical: 9,
                    paddingHorizontal: 15,
                  },
                  dateText: {
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: 15,
                    color: '#666666',
                  },
                  btnText: {
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                  },
                  btnTextConfirm: {
                    fontSize: 16,
                    color: '#659CEC',
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                  },
                  btnTextCancel: {
                    fontSize: 16,
                    fontFamily: 'Akkurat-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                  },
                }}
                onDateChange={(bday) => { this.setState({ Birthday: bday }); }}
              />
            }
            <Caption>Phone Number</Caption>
            { focus === 'six' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'six' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Yo digits"
                value={Phone_number}
                keyboardType='phone-pad'
                onChangeText={this.onChangePhoneNumber}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'six' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Yo digits"
                value={Phone_number}
                keyboardType='phone-pad'
                onChangeText={this.onChangePhoneNumber}
                returnKeyType='next'
              />
            }
            <Caption>Graduation Year</Caption>
            { focus === 'seven' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'seven' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="2019"
                value={Graduation_year}
                keyboardType='numeric'
                onChangeText={this.onChangeGraduationYear}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'seven' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="2019"
                value={Graduation_year}
                keyboardType='numeric'
                onChangeText={this.onChangeGraduationYear}
                returnKeyType='next'
              />
            }
            <Caption>Major</Caption>
            { focus === 'eight' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'eight' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Wambology"
                value={Major}
                onChangeText={this.onChangeMajor}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'eight' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Science"
                value={Major}
                onChangeText={this.onChangeMajor}
                returnKeyType='next'
              />
            }
            <Caption>Home Church</Caption>
            { focus === 'nine' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'nine' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Grace Community Church"
                value={Home_church}
                onChangeText={this.onChangeHomeChurch}
                returnKeyType='next'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'nine' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="Grace Community Church"
                value={Home_church}
                onChangeText={this.onChangeHomeChurch}
                returnKeyType='next'
              />
            }
            <Caption>Address</Caption>
            { focus === 'ten' ?
              <TextInput
                styleName='focused'
                onFocus={() => this.setState({ focus: 'ten' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="424 Veteran Ave"
                value={Address}
                onChangeText={this.onChangeAddress}
                returnKeyType='done'
              />
              :
              <TextInput
                onFocus={() => this.setState({ focus: 'ten' })}
                onSubmitEditing={() => this.setState({ focus: '' })}
                placeholder="424 Veteran Ave"
                value={Address}
                onChangeText={this.onChangeAddress}
                returnKeyType='done'
              />
            }
            <Divider />
            {this.renderButton()}
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

export default connect(mapStateToProps, { createAccount })(Signup);
