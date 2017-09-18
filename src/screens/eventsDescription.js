import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

// App Globals
import AppStyles from '../../styles';
import AppConfig from '../../config';

import CardSection from '../../components/CardSection';

import { eventsFetch } from '../../actions';


/* Component ==================================================================== */
class EventsDescription extends Component {
  render = () => {
    const event = this.props.event;
    return (
      <ScrollView>
        {event.image ? <Image source={{ uri: event.image }} style={[styles.imageBackground_image]}>
          <Text style={[AppStyles.baseText, styles.listRow_text, styles.listRowImage_text]}>{event.name}</Text>
        </Image> : null}
        <CardSection>
          {event.startdate ? <Text>When: {event.startdate} to {event.enddate} at {event.starttime} to {event.endtime}</Text> :
            <Text>When: {event.date} at {event.starttime} to {event.endtime}</Text>}
        </CardSection>
        <CardSection>
          <Text>Where: {event.location}</Text>
        </CardSection>
        <Text style={styles.descriptionText}>Description: {event.summary}</Text>
      </ScrollView>


    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    textAlign: 'center',
  },
  descriptionText: {
    paddingLeft: 5,
    fontFamily: AppConfig.baseFont,
    fontSize: AppConfig.baseFontSize,
    color: AppConfig.textColor,
    fontWeight: '300',
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  listRow: {
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
  },
  listRowInner: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppConfig.borderColor,
  },
  listRow_text: {
    color: AppConfig.textColor,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  listRowImage_text: {
    color: '#FFF',
  },
  imageBackground: {
    backgroundColor: '#333',
  },
  imageBackground_image: {
    height: AppConfig.windowHeight / 4,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },

});

/* Export Component ==================================================================== */
export default EventsDescription;
