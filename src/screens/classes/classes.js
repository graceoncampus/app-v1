import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform,
} from 'react-native';
import { Icon, Screen, Button, Image, View, Caption, Row, ListView, Divider, Title } from '@shoutem/ui';
import { connect } from 'react-redux';
import firebase from 'firebase';
import moment from 'moment';
import { classFetch } from '../../actions';
import { lookupByUID } from '../../utility';

class Classes extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Classes',
    }),
    title: 'CLASSES',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerRight: <View />,
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0, height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      counter: 0,
      loading: true,
    };
    this.props.classFetch();
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps = async (nextProps) => {
    const data = nextProps.classData;
    const classes = [];
    const currentUid = firebase.auth().currentUser.uid;
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const instructor = await lookupByUID(data[key].instructorUID);
        let isEnrolled = false;
        for (const student in data[key].students) {
          if (data[key].students.hasOwnProperty(student)) {
            if (currentUid === data[key].students[student].uid) {
              isEnrolled = true;
            }
          }
        }
        classes.push({
          title: data[key].title,
          summary: data[key].details,
          startDate: data[key].startDate,
          endDate: data[key].endDate,
          openSpots: data[key].openSpots,
          totalSpots: data[key].totalSpots,
          deadline: data[key].deadline,
          isEnrolled,
          instructor,
          key,
        });
      }
    }
    this.setState({
      classes,
      loading: false,
    });
  }

  renderRow(data) {
    const { title, image, openSpots, startDate, endDate, key, deadline, instructor, isEnrolled } = data;
    return (
      <TouchableOpacity onPress={() => { this.props.navigation.navigate('Class', { key, instructor }); }} >
        <Row>
          { image &&
            <Image
              styleName="small rounded-corners"
              source={{ uri: data.image }}
            />
          }
          <View styleName="vertical stretch space-between">
            <Title>{title}</Title>
            <Caption><Caption styleName="bold">Instructor: </Caption><Caption>{ instructor }</Caption></Caption>
            <Caption><Caption styleName="bold">Dates: </Caption><Caption >{moment.unix(startDate).format('MMMM Do')} - {moment.unix(endDate).format('MMMM Do')}</Caption></Caption>
            <Caption><Caption styleName="bold">Enroll By: </Caption>{moment.unix(deadline).format('MMMM Do')}</Caption>
            <Caption><Caption styleName="bold">Spots Left: </Caption>{ openSpots }</Caption>
          </View>
          { isEnrolled &&
            <Icon style={{ fontSize: 15, color: 'green'}} name="checkbox-on" />
          }
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    );
  }

  render = () => (
    <Screen>
      <ListView
        loading={this.state.loading}
        data={this.state.classes}
        renderRow={this.renderRow}
      />
    </Screen>
  )
}

const mapStateToProps = ({ ClassReducer }) => {
  const { classData } = ClassReducer;
  return { classData };
};

export default connect(mapStateToProps, { classFetch })(Classes);
