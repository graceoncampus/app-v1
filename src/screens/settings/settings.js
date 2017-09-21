import React, { Component } from 'react';
import { TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Icon, Text, Tile, View, Divider, Title, Screen, TextInput, FormGroup, Subtitle, Caption, Button, Spinner } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

import { getUserInfo, updateUserInfo, userLogout } from '../../actions';

class Settings extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Settings',
    }),
    title: 'SETTINGS',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { paddingTop: 16, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  componentWillMount() {
    this.setState({
      userInfo: {},
      focus: null,
      success: false,
      loading: false,
      First_name: '',
      Last_name: '',
      Phone_number: '',
      Birthday: '',
      Graduation_year: '',
      Major: '',
      Home_church: '',
      Address: '',
    });
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeGraduationYear = this.onChangeGraduationYear.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeHomeChurch = this.onChangeHomeChurch.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.props.getUserInfo();
  }

  componentWillReceiveProps = (nextProps) => {
    const data = nextProps.userInfo;
    const initValues = {
      First_name: data.firstName,
      Last_name: data.lastName,
      Phone_number: data.phoneNumber,
      Birthday: moment.unix(data.birthday).format('MM/DD/YYYY'),
      Address: data.address,
      Major: data.major,
      Home_church: data.homeChurch,
      Graduation_year: data.grad,
    };
    this.setState({
      ...initValues,
      userInfo: data,
    });
  }

  updateInfo = () => {
    const {
      First_name,
      Last_name,
      Phone_number,
      Birthday,
      Home_church,
      Graduation_year,
      Major,
      Address,
    } = this.state;
    this.setState({ loading: true });
    this.props.updateUserInfo(
      this.state.userInfo.email,
      First_name,
      Last_name,
      Phone_number,
      Birthday,
      Home_church,
      Graduation_year,
      Major,
      Address,
      this.state.userInfo.permissions,
      this.state.userInfo.image,
    );
    this.setState({ loading: false, success: true });
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
          <View styleName='horizontal h-center v-center fill-parent'><Text styleName="buttonText" style={{ paddingLeft: 15 }} >UPDATED</Text><Icon style={{ color: '#fff', paddingLeft: 10, paddingVertical: 10, fontSize: 16, lineHeight: 13 }} name="checkbox-on" /></View>
        </Button>
      );
    }

    return (
      <Button style={{ marginBottom: 15 }} onPress={this.updateInfo}>
        <Text>UPDATE ACCOUNT</Text>
      </Button>
    );
  }

  render = () => {
    const {
      First_name,
      Last_name,
      Phone_number,
      Birthday,
      Home_church,
      Graduation_year,
      Major,
      Address,
      focus,
    } = this.state;
    return (
      <Screen>
        <KeyboardAwareScrollView ref={(c) => { this.scroll = c; }}>
          <Tile style={{ paddingTop: 20, paddingBottom: 0, flex: 0.8, backgroundColor: 'transparent' }} styleName='text-centric'>
            <Title>Account Info!</Title>
            <Subtitle>Feel free to edit any of your account information below.</Subtitle>
            <Subtitle style={{ color: '#b40a34', paddingVertical: 10 }} >{this.props.error}</Subtitle>
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
                    borderColor: '#ae956b',
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
                onDateChange={bday => (this.setState({ Birthday: bday }))}
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
                onDateChange={bday => (this.setState({ Birthday: bday }))}
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
                placeholder="Science"
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
            <View style={{ flex: 0.25 }} styleName='vertical h-center v-end'>
              {this.renderButton()}
              <Button style={{ marginBottom: 15 }} styleName='outline' onPress={() => this.props.navigation.navigate('PasswordChange')}>
                <Text>CHANGE PASSWORD</Text>
              </Button>
              <Button style={{ marginBottom: 15 }} styleName='outline' onPress={() => this.props.navigation.navigate('inviteUser')}>
                <Text>INVITE NEW USER</Text>
              </Button>
              <Button styleName='outline' onPress={() => this.props.userLogout()}>
                <Text>LOG OUT</Text>
              </Button>
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

export default connect(mapStateToProps, { updateUserInfo, getUserInfo, userLogout })(Settings);
