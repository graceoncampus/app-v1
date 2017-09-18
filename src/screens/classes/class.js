import React, { Component } from 'react';
import firebase from 'firebase';
import { 
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { classEnroll, classUnenroll } from '../../actions';
import { CardSection } from '../../components/common';
import Button from '../../components/button';
import AppStyles from '../../styles';

class classDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name='ios-arrow-back-outline' style={{ marginLeft: 10 }} size={30} color={'#000'} />
      </TouchableOpacity>
    ),
  })
  constructor(props) {
    super(props);
    this.onUnenrollPress = this.onUnenrollPress.bind(this);
    this.checkEnroll = this.checkEnroll.bind(this);
    this.onEnrollPress = this.onEnrollPress.bind(this);
  }
  onUnenrollPress() {
    const { classData } = this.props;
    const { key } = this.props.navigation.state.params;
    const numSpots = classData[key].openSpots;
    this.props.classUnenroll(key, numSpots);
  }

  onEnrollPress() {
    const { classData } = this.props;
    const { key } = this.props.navigation.state.params;
    const numSpots = classData[key].openSpots;
    if (this.checkEnroll()) {
      this.props.classEnroll(key, numSpots);
    }
  }

  checkEnroll() {
    const { classData } = this.props;
    const { key } = this.props.navigation.state.params;
    const currentUid = 'HaH2jdlJ7WZxU5tUrIz3cYPTW522'; /* currentUser.uid */
    const allStudents = classData[key].students;
    for (const student in allStudents) {
      if (allStudents.hasOwnProperty(student)) {
        if (currentUid === allStudents[student].uid) {
          return false;
        }
      }
    }
    return true;
  }

  renderButton() {
  if (this.checkEnroll()) {
    return (
    <View>
      <View style={AppStyles.spacer_20} />
      <View style={[AppStyles.paddingHorizontal]}>
          <Button
            text={'Enroll Now'}
            onPress={this.onEnrollPress}
          />
      </View>
    </View>
    );
  }

  return (
    <View>
    <CardSection>
      <Text style={styles.enrolledTextStyle}> You are currently enrolled in this course </Text>
    </CardSection>
    <CardSection>
      <Button onPress={this.onUnenrollPress}>
        Drop Class
      </Button>
    </CardSection>
    </View>
  );
}

  render() {
    const { classData } = this.props;
    const { key } = this.props.navigation.state.params;
    return (
      <View>
        <CardSection>
          <Text style={styles.titleStyle}>{classData[key].title}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.descriptionStyle}>Instructor: {classData[key].instructor}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.descriptionStyle}>Location: {classData[key].location}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.descriptionStyle}>Time: {classData[key].time}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.descriptionStyle}>
            Registration Deadline: {classData[key].deadline}
          </Text>
        </CardSection>
        <CardSection>
          <Text style={styles.descriptionStyle}>
            Open Spots: {classData[key].openSpots} / {classData[key].totalSpots}
          </Text>
        </CardSection>
        <CardSection>
          <Text style={styles.descriptionStyle}>{classData[key].details}</Text>
        </CardSection>

        {this.renderButton()}

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 36,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  enrolledTextStyle: {
    color: '#007aff',
    fontSize: 20,
    alignSelf: 'center',
  },
  descriptionStyle: {
    flex: 1,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20
  }
};

const mapStateToProps = ({ ClassReducer }) => {
  const { classData, loading, error } = ClassReducer;

  return { classData, loading, error };
};

export default connect(mapStateToProps, { classEnroll, classUnenroll })(classDetails);
