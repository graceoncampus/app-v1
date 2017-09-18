import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import { eventsUpdate } from '../../actions';

import CardSection from '../../components/CardSection';
import Input from '../../components/Input';

class EventsForm extends Component {
  render = () => (
    <ScrollView>
      <CardSection>
        <Input
          label="Title"
          value={this.props.title}
          onChangeText={value => this.props.eventsUpdate({ prop: 'title', value })}
        />
      </CardSection>
      <CardSection>
        <Input
          label="Summary"
          value={this.props.summary}
          onChangeText={value => this.props.eventsUpdate({ prop: 'summary', value })}
        />
      </CardSection>
      <CardSection>
        <Input
          label=" Start Date"
          placeholder='MM/DD/YYYY'
          value={this.props.startdate}
          onChangeText={value => this.props.eventsUpdate({ prop: 'startdate', value })}
        />
        <Input
          label="End Date"
          placeholder='MM/DD/YYYY'
          value={this.props.enddate}
          onChangeText={value => this.props.eventsUpdate({ prop: 'enddate', value })}
        />
      </CardSection>
      <CardSection>
        <Input
          label="Start Time"
          placeholder='HH:mm:ss'
          value={this.props.starttime}
          onChangeText={value => this.props.eventsUpdate({ prop: 'starttime', value })}
        />
        <Input
          label="End Time"
          placeholder='HH:mm:ss'
          value={this.props.endttime}
          onChangeText={value => this.props.eventsUpdate({ prop: 'endtime', value })}
        />
      </CardSection>
      <CardSection>
        <Input
          label="Image"
          value={this.props.image}
          onChangeText={value => this.props.eventsUpdate({ prop: 'image', value })}
        />
      </CardSection>
      <CardSection>
        <Input
          label="Location"
          value={this.props.location}
          onChangeText={value => this.props.eventsUpdate({ prop: 'location', value })}
        />
      </CardSection>
    </ScrollView>
  );
}
const mapStateToProps = (state) => {
  const { title, summary, startdate, enddate, image, location, starttime, endtime } = state.EventsFormReducer;
  return { title, summary, startdate, enddate, image, location, starttime, endtime };
};

export default connect(mapStateToProps, { eventsUpdate })(EventsForm);
