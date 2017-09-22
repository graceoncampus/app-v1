import React, { Component } from 'react';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import { Tile, View, Divider, Title, Screen, TextInput, FormGroup, Subtitle, Caption, Button, Text, Icon, Spinner } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
import { getUserInfo } from '../../actions/AuthActions';

class RidesSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      morning: false,
      evening: false,
      staying: false,
      name: '',
      address: '',
      number: '',
      comments: '',
      email: '',
      error: null,
      loading: false,
      success: false,
    };
    this.props.getUserInfo();
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }
  onChangeAddress = address => (this.setState({ address }))
  onChangeNumber = number => (this.setState({ number }))
  onChangeComment = comments => (this.setState({ comments }))
  onChangeEmail = email => (this.setState({ email }))
  onChangeName = name => (this.setState({ name }))

  signUp = () => {
    this.setState({ error: null, loading: true });
    const { name, address, number, comments, email, morning, evening, staying } = this.state;
    let time = '';
    time += morning ? 'Morning, ' : '';
    time += evening ? 'Evening, ' : '';
    time += staying ? 'Staying' : '';
    if (name === '' || address === '' || number === '' || number === '' || email === '' || time === '') { return this.setState({ error: 'Please fill out all fields' }); }
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    const postData = { name, address, number, comments, email, time, timestamp };
    const signup = firebase.database().ref('ridesSignup');
    return signup.push(postData).then((this.setState({
      success: true,
      focus: '',
      morning: false,
      evening: false,
      staying: false,
      loading: false,
      name: '',
      address: '',
      number: '',
      comments: '',
      email: '',
    })));
  }
  componentWillReceiveProps = (nextProps) => {
    const data = nextProps.userInfo;
    const initValues = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      address: data.address,
      number: data.phoneNumber,
    };
    this.setState({
      ...initValues,
    });
  }

  renderForm = () => {
    const {
      name,
      address,
      number,
      comments,
      email,
      focus,
      morning,
      evening,
      staying,
    } = this.state;
    return (
      <FormGroup>
        <Caption>Name</Caption>
        { focus === 'one' ?
          <TextInput
            styleName='focused'
            onFocus={() => this.setState({ focus: 'one' })}
            onSubmitEditing={() => this.setState({ focus: '' })}
            placeholder="John the Baptist"
            value={name}
            onChangeText={this.onChangeName}
            returnKeyType='next'
          />
          :
          <TextInput
            onFocus={() => this.setState({ focus: 'one' })}
            onEndEditing={() => this.setState({ focus: '' })}
            placeholder="John the Baptist"
            value={name}
            onChangeText={this.onChangeName}
            returnKeyType='next'
          />
        }
        <Caption>Address</Caption>
        { focus === 'two' ?
          <TextInput
            styleName='focused'
            onFocus={() => this.setState({ focus: 'two' })}
            onSubmitEditing={() => this.setState({ focus: '' })}
            placeholder="Hedrick Hall"
            value={address}
            onChangeText={this.onChangeAddress}
            returnKeyType='next'
          />
          :
          <TextInput
            onFocus={() => this.setState({ focus: 'two' })}
            onSubmitEditing={() => this.setState({ focus: '' })}
            placeholder="Hedrick Hall"
            value={address}
            onChangeText={this.onChangeAddress}
            returnKeyType='next'
          />
        }
        <Caption>Phone Number</Caption>
        { focus === 'six' ?
          <TextInput
            styleName='focused'
            onFocus={() => this.setState({ focus: 'six' })}
            onSubmitEditing={() => this.setState({ focus: '' })}
            placeholder="Yo digits"
            value={number}
            keyboardType='phone-pad'
            onChangeText={this.onChangeNumber}
            returnKeyType='next'
          />
          :
          <TextInput
            onFocus={() => this.setState({ focus: 'six' })}
            onSubmitEditing={() => this.setState({ focus: '' })}
            placeholder="Yo digits"
            value={number}
            keyboardType='phone-pad'
            onChangeText={this.onChangeNumber}
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
            placeholder="youremail@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={this.onChangeEmail}
            returnKeyType='next'
          />
          :
          <TextInput
            onFocus={() => this.setState({ focus: 'three' })}
            onSubmitEditing={() => this.setState({ focus: '' })}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="youremail@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={this.onChangeEmail}
            returnKeyType='next'
          />
        }
        <Caption>Comments</Caption>
        { focus === 'four' ?
          <TextInput
            styleName='focused'
            autoCorrect={false}
            onFocus={() => this.setState({ focus: 'four' })}
            onSubmitEditing={() => this.setState({ focus: '' })}
            placeholder="Jireh please"
            value={comments}
            onChangeText={this.onChangeComment}
            returnKeyType='next'
          />
          :
          <TextInput
            autoCorrect={false}
            onFocus={() => this.setState({ focus: 'four' })}
            onSubmitEditing={() => this.setState({ focus: '' })}
            placeholder="Jireh please"
            value={comments}
            onChangeText={this.onChangeComment}
            returnKeyType='next'
          />
        }
        <CheckBox
          style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 10 }}
          onClick={() => (this.setState({ focus: '', morning: !morning }))}
          isChecked={morning}
          leftText={'Morning (8:30 AM - 12:00 PM)'}
          checkBoxColor={'#ae956b'}
          leftTextStyle={{
            fontFamily: 'Akkurat-Regular',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#3a3f4b',
            fontSize: 15,
            lineHeight: 18,
          }}
        />
        <CheckBox
          style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 10 }}
          onClick={() => (this.setState({ focus: '', evening: !evening }))}
          isChecked={evening}
          checkBoxColor={'#ae956b'}
          leftText={'Evening (6:00 PM - 7:30 PM)'}
          leftTextStyle={{
            fontFamily: 'Akkurat-Regular',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#3a3f4b',
            fontSize: 15,
            lineHeight: 18,
          }}
        />
        <CheckBox
          style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 10 }}
          onClick={() => (this.setState({ focus: '', staying: !staying }))}
          isChecked={staying}
          checkBoxColor={'#ae956b'}
          leftText={'Staying (8:30 AM - 7:30 PM)'}
          leftTextStyle={{
            fontFamily: 'Akkurat-Regular',
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: '#3a3f4b',
            fontSize: 15,
            lineHeight: 18,
          }}
        />
        <Divider />
        {this.renderButton()}
        <Divider />
        <Divider />
        <Divider />
      </FormGroup>
    );
  }
  renderButton = () => {
    if (this.state.loading) {
      return (
        <Button style={{ paddingVertical: 15 }}>
          <Spinner style={{ color: '#fff' }}/>
        </Button>
      );
    }

    if (this.state.success) {
      return (
        <Button styleName='success'>
          <View styleName='horizontal h-center v-center fill-parent'><Text styleName="buttonText" style={{ paddingLeft: 15 }} >SIGNED UP</Text><Icon style={{ color: '#fff', paddingLeft: 10, paddingVertical: 10, fontSize: 16, lineHeight: 13 }} name="checkbox-on" /></View>
        </Button>
      );
    }

    return (
      <Button onPress={() => this.signUp()}>
        <Text>SIGN UP</Text>
      </Button>
    );
  }

  render = () => {
    const { error } = this.state;
    return (
      <Screen>
        <KeyboardAwareScrollView>
          <Tile
            style={{
              paddingTop: 20,
              paddingBottom: 0,
              flex: 0.8,
              backgroundColor: 'transparent',
            }}
            styleName='text-centric'
          >
            <Title>Do It!</Title>
            <Subtitle>Sign up for a ride to church</Subtitle>
            <Subtitle style={{ color: '#b40a34', paddingVertical: 10 }} >{error}</Subtitle>
          </Tile>
          { this.renderForm() }
        </KeyboardAwareScrollView>
      </Screen>
    );
  }
}


const mapStateToProps = ({ AuthReducer }) => {
  const { userInfo } = AuthReducer;
  return { userInfo };
};

export default connect(mapStateToProps, { getUserInfo })(RidesSignup);
