import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform, ScrollView, Linking,
} from 'react-native';
import moment from 'moment';
import { Icon, Divider, Button, Title, View, Screen, Text, Caption, Spinner } from '@shoutem/ui';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { classUsersFetch, studentsInfoFetch } from '../../actions';
import { lookupByUID } from '../../utility'

class classInfo extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Classes',
    }),
    title: 'CLASSES',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Icon name='back' style={{ paddingLeft: 10 }} />
      </TouchableOpacity>
    ),
    headerRight: <View />,
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0, height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.state = {
      allUsers: {},
      enrolledStudents: [],
      allEmails: [],
    };
    this.props.classUsersFetch();
  }

 componentWillReceiveProps = async(nextProps) => {
    const data = nextProps.allUsers;
    this.setState({
      allUsers: data,
      enrolledStudents: [],
      allEmails: [],
    });
    const { classData } = this.props;
    const { key } = this.props.navigation.state.params;
    const { students } = classData[key];
    let useruid = '';
    let name = '';
    let enrolled = [];
    let emails = [];
    let email = '';
    console.log(students);
    for (const student in students) {
          useruid = (students[student].uid);
          name = await studentsInfoFetch(useruid);
          email = name.split(":")[1];
          email = email.slice(4);
          email.trim();
          emails.push(email);
          this.appendName(name,enrolled);
      }
      console.log(emails[0]);
      this.setState({
        enrolledStudents: enrolled,
        allEmails: emails,
      });
      console.log(enrolled);
      console.log(emails);
  }

  appendName(name, enrolled) {
    enrolled.push(name + '\n');
    return (enrolled);
  }
  showStudents() {
    return this.state.enrolledStudents.map((student) => {return (<Text>{student}</Text>)});

  }

  emailString(){
    let str = 'mailto:?';
    for (const i in this.state.allEmails){
      str += '&cc=' + this.state.allEmails[i];
    }
    return str;
  }


  render = () => {
    const { classData } = this.props;
    const { key, instructor } = this.props.navigation.state.params;
    const { title, location, startDate, endDate, deadline, totalSpots, openSpots, day, classTime, students } = classData[key];
    if (this.state.enrolledStudents.length > 0)
    return (
      <Screen>
        <Divider />
        <View styleName='vertical h-center' style={{ borderBottomWidth: 1, borderBottomColor: '#ecedef' }} >
          <Title>{title}</Title>
          <Divider />
          {instructor &&
              <Caption><Caption styleName="bold">Instructor: </Caption>{instructor}</Caption>
          }
          {location &&
              <Caption><Caption styleName="bold">Location: </Caption>{location}</Caption>
          }
          <Caption><Caption styleName="bold">Dates: </Caption>{moment.unix(startDate).format('MMMM Do')} - {moment.unix(endDate).format('MMMM Do')}</Caption>
          <Caption><Caption styleName="bold">Time: </Caption><Caption >{classTime}</Caption></Caption>
          <Caption><Caption styleName="bold">Day of the Week: </Caption><Caption >{day}</Caption></Caption>
          {deadline &&
              <Caption><Caption styleName="bold">Enroll By: </Caption>
                {moment.unix(deadline).format('MMMM Do')}</Caption>
          }
          {totalSpots &&
              <Caption><Caption styleName="bold">Spots Left: </Caption>
                {openSpots}/{totalSpots}</Caption>
          }
          <Divider />
        </View>
        <ScrollView>
          { students &&
            <View style={{ backgroundColor: 'white', paddingTop: 35, paddingHorizontal: 35, paddingBottom: 50 }}>
              <Text>
                {this.showStudents()}
              </Text>
              <Button styleName='stacked clear' onPress={() => Linking.openURL(this.emailString())} >
                <Icon name="email" />
                <Text>EMAIL</Text>
              </Button>
            </View>
          }
        </ScrollView>
      </Screen>
    );
    return (
      <Screen>
        <View styleName='vertical fill-parent v-center h-center'>
          <Spinner size="large" />
        </View>
      </Screen>
    );
  }
}
const mapStateToProps = ({ ClassReducer }) => {
  const { classData, loading, error, allUsers, enrolledStudents } = ClassReducer;
  return { classData, loading, error, allUsers, enrolledStudents };
};

export default connect(mapStateToProps, { classUsersFetch, studentsInfoFetch })(classInfo);
