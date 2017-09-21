import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform,
  ScrollView,
} from 'react-native';
import { Icon, Screen, Image, Tile, Title, ListView, Divider, Subtitle } from '@shoutem/ui';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Parallax,
  ScrollDriver,
} from '@shoutem/animation';
import _ from 'lodash';
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
    headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { paddingTop: 16, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.props.eventsFetch();
    this.renderRow = this.renderRow.bind(this);
    this.driver = new ScrollDriver();
  }

  renderRow(event) {
    const { title, startdate, enddate, key, bannerURI, location } = event;
    return (
      <TouchableOpacity key={key} onPress={() => { this.props.navigation.navigate('Event', { event }); }} >
        <Image
          styleName="large-banner"
          source={{ uri: bannerURI === '' ? 'https://placeimg.com/640/480/nature' : bannerURI }}
        >
          <Tile>
            <Parallax driver={this.driver} scrollSpeed={1.2}>
              <Title>{title}</Title>
              {moment.unix(startdate).format('MMMM Do') === moment.unix(enddate).format('MMMM Do') ?
                <Subtitle>{moment.unix(startdate).format('MMMM Do, h:mm A')} - {moment.unix(enddate).format('h:mm A')}</Subtitle>
                :
                <Subtitle>{moment.unix(startdate).format('MMMM Do')} - {moment.unix(enddate).format('MMMM Do')}</Subtitle>
              }
            </Parallax>
          </Tile>
        </Image>
        <Divider styleName='line' />
      </TouchableOpacity>
    );
  }

  render() {
    const { events } = this.props;
    return (
      <Screen>
        <ScrollView {...this.driver.scrollViewProps}>
          <ListView
            loading={((events && events.length))}
            data={_.values(events)}
            renderRow={this.renderRow}
          />
        </ScrollView>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({ events: state.events });

export default connect(mapStateToProps, { eventsFetch })(Events);
