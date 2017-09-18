import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FormValidation from 'tcomb-form-native';
import { connect } from 'react-redux';
import { resetUserPassword } from '../../actions';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Ionicons';

import AppStyles from '../../styles';

class ForgotPassword extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Reset Password",
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name='ios-arrow-back-outline' style={{ marginLeft: 10 }} size={30} color={'#000'} />
      </TouchableOpacity>
    ),
  })
  constructor(props) {
    super(props);
    // Initial state
    this.state = {

      form_fields: FormValidation.struct({
        Email: FormValidation.String,
      }),
      empty_form_values: {
        Email: '',
      },
      form_values: {},
      options: {
        fields: {
          Email: { error: 'Please enter the email address for the account password you wish to reset' },
        }
      },
    };
  }

  onChange = (form_values) => {
    this.setState({ form_values });
  }

  onButtonPress = () => {
    const form_values = this.refs.form.getValue();
    if (form_values) {
      const { Email } = form_values;
      this.props.resetUserPassword(Email);
    }
  }

  renderButton() {
  return (
  <View style={[AppStyles.paddingHorizontal]}>
        <Button
          text={'Reset Password'}
          onPress={this.onButtonPress.bind(this)}
        />
  </View>
  );
}

render = () => {
  const Form = FormValidation.form.Form;

  return (
    <View style={styles.container}>
      <View style={[AppStyles.paddingHorizontal]}>
        <Text style={styles.TextStyle}>
          Please enter the email address for your GOC account. An email will be sent to your email address indicating instructions on how to reset your password
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

      <View style={AppStyles.spacer_20} />

      <View style={[AppStyles.paddingHorizontal]}>
        {this.renderButton()}
      </View>
    </View>
  );
}
}

const styles = {
  TextStyle: {
    fontSize: 14,
    alignSelf: 'center',
  },
  container: {
   justifyContent: 'center',
   padding: 20,
   backgroundColor: '#ffffff',
 },
};

const mapStateToProps = ({ AuthReducer }) => {
  const { user, error, loading, userInfo } = AuthReducer;

  return { user, error, loading, userInfo };
};

export default connect(mapStateToProps, { resetUserPassword })(ForgotPassword);
