import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import FormValidation from 'tcomb-form-native';
import { connect } from 'react-redux';
import { classAdd } from '../../actions';

import AppStyles from '../../styles';
import Button from '../../components/button';
import Alerts from '../../components/alerts';
import Icon from 'react-native-vector-icons/Ionicons';

class addClass extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Create Class'
    }),
    title: 'Create Class',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name='ios-menu-outline' style={{ marginLeft: 10 }} size={30} color={'#000'} />
      </TouchableOpacity>
    ),
  })

  constructor(props) {
    super(props);
    this.state = {
      resultMsg: {
       status: '',
       success: '',
       error: '',
     },
      form_fields: FormValidation.struct({
        title: FormValidation.String,
        instructorEmail: FormValidation.String,
        location: FormValidation.String,
        classTime: FormValidation.String,
        startDate: FormValidation.String,
        endDate: FormValidation.String,
        openSpots: FormValidation.Number,
        deadline: FormValidation.String,
        details: FormValidation.String,
      }),
      empty_form_values: {
        title: '',
        instructorEmail: '',
        location: '',
        classTime: '',
        startDate: '',
        endDate: '',
        openSpots: '',
        deadline: '',
        details: '',
      },
      form_values: {},
      options: {
        fields: {
          title: { error: 'Please enter title of class' },
          instructorEmail: { error: 'Please enter email address of instructor associated with their account' },
          location: { error: 'Please enter location class will be held' },
          classTime: { error: 'Please enter time of class' },
          startDate: { placeholder: 'DD/MM/YYYY',
                      error: 'Please enter date class will start' },
          endDate: { placeholder: 'DD/MM/YYYY',
                      error: 'Please enter date class will end' },
          openSpots: { error: 'Please enter number of spots in class' },
          deadline: { placeholder: 'DD/MM/YYYY',
                      error: 'Please enter registration deadline', },
          details: { error: 'Please enter a description of the class' },
        }
      },
    };
  }

    onChange = form_values => (this.setState({ form_values }))

    signUp = () => {
      const form_values = this.refs.form.getValue();
      if (form_values) {
        const postData = {
          title: form_values.title,
          instructorUID: form_values.instructorEmail,
          location: form_values.location,
          classTime: form_values.classTime,
          startDate: moment(form_values.startDate, 'MM/DD/YYYY').unix(),
          endDate: moment(form_values.endDate, 'MM/DD/YYYY').unix(),
          openSpots: form_values.openSpots,
          totalSpots: form_values.openSpots,
          deadline: moment(form_values.deadline, 'MM/DD/YYYY').unix(),
          details: form_values.details,
          enrolledUsers: [],
          bannerURI: 'bannerURI',
          permalink: 'permalink',
        };
        this.setState({
            data: ''
        });
        this.props.classAdd(postData);
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
              {this.state.form_values.First_name === '' ? 'New Class' : 'New MyGOC Class'}
            </Text>
            <Text style={[AppStyles.baseText, AppStyles.p, AppStyles.centered]}>
              Add a new class that will be offered this quarter
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
              text={'Add Class'}
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
});

const mapStateToProps = ({ ClassReducer }) => {
  const { classData, loading, error } = ClassReducer;
  return { classData, loading, error };
};

export default connect(mapStateToProps, { classAdd })(addClass);
