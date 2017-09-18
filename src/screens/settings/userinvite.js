import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import FormValidation from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppStyles from '../../styles';
import Button from '../../components/button';
import Alerts from '../../components/alerts';

class UserInvite extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Invite New User",
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name='ios-arrow-back-outline' style={{ marginLeft: 10 }} size={30} color={'#000'} />
      </TouchableOpacity>
    ),
  })
  // static navigationOptions = ({ navigation }) => ({
  //   drawer: () => ({
  //     label: 'Invite User'
  //   }),
  //   title: 'Invite User',
  //   headerLeft: (
  //     <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
  //       <Icon name='ios-menu-outline' style={{ marginLeft: 10 }} size={30} color={'#000'} />
  //     </TouchableOpacity>
  //   ),
  // })

  constructor(props) {
    super(props);
    const valid_email = FormValidation.refinement(
      FormValidation.String, (email) => {
        const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
      }
    );

    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct({
        New_User_Email: valid_email,
      }),
      empty_form_values: {
        New_User_Email: '',
      },
      form_values: {},
      options: {
        fields: {
          New_User_Email: { error: 'Please enter a valid email' },
        }
      },
    };
  }

    onChange = (form_values) => (this.setState({ form_values }))

    signUp = () => {
      const form_values = this.refs.form.getValue();
      if (form_values) {
        firebase.database().ref('invitedUsers').orderByChild('email').equalTo(form_values.New_User_Email).once('value', (snapshot) => {
          const emailCheck = snapshot.val();
          if (emailCheck) {
            alert('This email has already been invited');
          }
          else {
            firebase.database().ref('users').orderByChild('email').equalTo(form_values.New_User_Email).once('value', (snapshot) => {
              const existingUser = snapshot.val();
              if (existingUser) {
                  alert('An account with this email address has already been created');
              } else {
                const postData = {
                  email: form_values.New_User_Email,
                };
                const userInvite = firebase.database().ref('invitedUsers');
                userInvite.push(postData);
                alert('This email has been successfully invited');
              }
            });
          }
        });
      }
    }

    render = () => {
      const Form = FormValidation.form.Form;
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          ref={'scrollView'}
          style={[AppStyles.container]}
          contentContainerStyle={[AppStyles.containerCentered, styles.container]}
        >
          <View style={[AppStyles.paddingHorizontal]}>
            <Alerts
              status={this.state.resultMsg.status}
              success={this.state.resultMsg.success}
              error={this.state.resultMsg.error}
            />
            <Text style={[AppStyles.baseText, AppStyles.h3, AppStyles.centered]}>
              Invite a New User
            </Text>
            <Text style={[AppStyles.baseText, AppStyles.p, AppStyles.centered]}>
              Make sure you enter this correctly. This will be their log in email.
            </Text>
            <View style={AppStyles.spacer_20} />
            <Form
              ref="form"
              type={this.state.form_fields}
              value={this.state.form_values}
              options={this.state.options}
              onChange={this.onChange}
            />
          </View>
          <View style={AppStyles.hr} />
          <View style={[AppStyles.paddingHorizontal]}>
            <Button
              text={'Invite User'}
              onPress={this.signUp}
            />
          </View>
        </ScrollView>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  containerStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center'
    },
    labelStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '800',
        color: 'black'

    },
    checkboxStyle: {
        width: 26,
        height: 26,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 5
    }
});

export default UserInvite;
