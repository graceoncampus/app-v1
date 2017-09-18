import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FormValidation from 'tcomb-form-native';
import { connect } from 'react-redux';
import { changeUserPassword } from '../../actions';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Ionicons';

import AppStyles from '../../styles';

class ChangePassword extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Change Password",
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name='ios-arrow-back-outline' style={{ marginLeft: 10 }} size={30} color={'#000'} />
      </TouchableOpacity>
    ),
  })
  constructor(props) {
    super(props);
    const valid_password = FormValidation.refinement(
      FormValidation.String, (password) => {
        if (password.length < 6) return false;
        return true;
      }
    );
    // Initial state
    this.state = {

      form_fields: FormValidation.struct({
        Old_password: valid_password,
        New_password: valid_password,
        Confirm_new_password: valid_password
      }),
      empty_form_values: {
        Old_password: '',
        New_password: '',
        Confirm_new_password: ''
      },
      form_values: {},
      options: {
        fields: {
          Old_password: { error: 'Please enter your old password',
          secureTextEntry: true },
          New_password: { error: 'Your new password must be more than 6 characters',
          secureTextEntry: true },
          Confirm_new_password: { error: 'Your new password must be more than 6 characters',
          secureTextEntry: true },
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
      const { Old_password, New_password, Confirm_new_password } = form_values;
      if(New_password === Confirm_new_password) {
        this.props.changeUserPassword(Old_password, New_password);
      }
      else {
        form_values.New_password = '';
        form_values.Confirm_new_password = '';
        this.setState({ form_values });
        alert('New passwords did not match');
      }
    }
  }

  renderButton() {
  return (
  <View style={[AppStyles.paddingHorizontal]}>
        <Button
          text={'Change Password'}
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

export default connect(mapStateToProps, { changeUserPassword })(ChangePassword);
