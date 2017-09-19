import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Icon, Screen, Image, View, Caption, Spinner, Row, ListView, Divider, Subtitle } from '@shoutem/ui';
import { connect } from 'react-redux';
import moment from 'moment';
import { eventsFetch } from '../../actions';

class Events extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Events',
    }),
    title: 'EVENTS',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.props.eventsFetch();
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(event) {
    const { title, startdate, key, image, location } = event;
    return (
      <TouchableOpacity key={key} onPress={() => { this.props.navigation.navigate('Event', { event }) }} >
        <Row>
          { image &&
            <Image
              styleName="small square"
              source={{ uri: image }}
            />
          }
          <View styleName="vertical stretch space-between">
            <Subtitle>{title}</Subtitle>
            <Caption>{moment.unix(startdate).format('MMMM Do HH:mm')}  ·  {location}</Caption>
          </View>
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    );
  }

  render() {
    const { events } = this.props;
    return (
      <Screen>
        {
          events ?
            <ScrollView>
              <ListView
                data={this.props.events}
                renderRow={this.renderRow}
              />
            </ScrollView>
            :
            <View styleName='vertical fill-parent v-center h-center'>
              <Spinner size='large'/>
            </View>
        }
      </Screen>
    );
  }
}

const mapStateToProps = state => ({ events: state.events });

export default connect(mapStateToProps, { eventsFetch })(Events);
