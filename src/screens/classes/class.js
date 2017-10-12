import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform, ScrollView, Alert
} from 'react-native';
import moment from 'moment';
import { Icon, Divider, Button, Title, View, Screen, Text, Caption } from '@shoutem/ui';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { classEnroll, classUnenroll } from '../../actions';

class classDetails extends Component {
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
    this.unenroll = this.unenroll.bind(this);
    this.isEnrolled = this.isEnrolled.bind(this);
    this.enroll = this.enroll.bind(this);
  }
  unenroll() {
    const { classData } = this.props;
    const { key } = this.props.navigation.state.params;
    const numSpots = classData[key].openSpots;
    this.props.classUnenroll(key, numSpots);
  }

  enroll() {
    const { classData } = this.props;
    const { key } = this.props.navigation.state.params;
    const numSpots = classData[key].openSpots;
    if (!this.isEnrolled()) {
      this.props.classEnroll(key, numSpots);
    }
  }

  isEnrolled() {
    const { classData } = this.props;
    const { key } = this.props.navigation.state.params;
    const currentUid = firebase.auth().currentUser.uid;
    const allStudents = classData[key].students;
    for (const student in allStudents) {
      if (allStudents.hasOwnProperty(student)) {
        if (currentUid === allStudents[student].uid) {
          return true;
        }
      }
    }
    return false;
  }

  renderButton() {
    const { classData } = this.props;
    const { key, instructor } = this.props.navigation.state.params;
    if(classData[key].openSpots == 0) {
      return (
        <Button styleName="red" onPress={() => Alert.alert('','Sorry, class is still full')}>
          <Text>Class Full</Text>
        </Button>
      )
    }
    if (this.isEnrolled()) {
      return (
        <Button styleName="red" onPress={() => this.unenroll()}>
          <Text>Unenroll</Text>
        </Button>
      );
    }
    return (
      <Button onPress={() => this.enroll()}>
        <Text>Enroll</Text>
      </Button>
    );
  }

  render = () => {
    const { classData } = this.props;
    const { key, instructor } = this.props.navigation.state.params;
    const { title, location, startDate, endDate, deadline, totalSpots, openSpots, details, day, classTime } = classData[key];
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
          { details &&
            <View style={{ backgroundColor: 'white', paddingTop: 35, paddingHorizontal: 35, paddingBottom: 50 }}>
              <Text>
                { details }
              </Text>
            </View>
          }
        </ScrollView>
        { firebase.auth().currentUser &&
          <View style={{ paddingHorizontal: 25, paddingVertical: 15 }}>
            {this.renderButton()}
          </View>
        }
      </Screen>
    );
  }
}
const mapStateToProps = ({ ClassReducer }) => {
  const { classData, loading, error } = ClassReducer;
  return { classData, loading, error };
};

export default connect(mapStateToProps, { classEnroll, classUnenroll })(classDetails);
