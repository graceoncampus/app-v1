import React, { Component } from 'react';
import {
  DatePickerAndroid,
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// App Globals
import AppStyles from '../../styles';
import AppConfig from '../../config';
import AppUtil from '../../util';

// Components
import ListRow from '../../components/list.row';
import EventsForm from './eventsForm';

//actions
import { eventsUpdate, eventsCreate } from '../../actions';

//common components
import CardSection from '../../components/CardSection';
import Input from '../../components/Input';
import Card from '../../components/Card';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Ionicons';


class EventsCreate extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Create Event'
    }),
    title: 'Create Event',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name='ios-menu-outline' style={{ marginLeft: 10 }} size={30} color={'#000'} />
      </TouchableOpacity>
    ),
  })

  onButtonPress() {
    const { title, summary, startdate, enddate, image, location, starttime, endtime } = this.props;
    this.props.eventsCreate({ title, summary, startdate, enddate, image, location, starttime, endtime });
  }

  render() {
    return (
      <Card>
        <EventsForm {...this.props} />
        <CardSection>
          <Button
           onPress={this.onButtonPress.bind(this)}
           text={'Create Event'}
          />
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { title, summary, startdate, enddate, image, location, starttime, endtime} = state.EventsFormReducer;
  return { title, summary, startdate, enddate, image, location, starttime, endtime };
};

export default connect(mapStateToProps, { eventsUpdate, eventsCreate })(EventsCreate);
