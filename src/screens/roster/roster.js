import React, { Component } from 'react';
import {
  TouchableOpacity, StatusBar, Platform, 
  ScrollView,
} from 'react-native';
import { Icon, Screen, Row, ListView, FormGroup, View, TextInput, Divider, Subtitle } from '@shoutem/ui'; import { connect } from 'react-redux';
import _ from 'lodash';
import { filter, some, includes } from 'lodash/collection';
import { debounce } from 'lodash/function';

import * as actions from '../../actions/';

class Roster extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Roster',
    }),
    title: 'ROSTER',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerRight: <View />,  headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0,  height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
    this.props.getAllUsers();
    this.onChangeText = this.onChangeText.bind(this);
    this.internalSearch = this.internalSearch.bind(this);
    this.depthFirstSearch = this.depthFirstSearch.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ results: nextProps.roster });
  }

  renderRow = user => (
    <TouchableOpacity onPress={() => { this.props.navigation.navigate('IndividualUser', { user }); }}>
      <Row styleName="small">
        <Subtitle>{`${user.firstName} ${user.lastName}`}</Subtitle>
      </Row>
      <Divider styleName='line' />
    </TouchableOpacity>
  );

  onChangeText = (input) => {
    this.setState({ input });
    debounce(() => {
      const results = this.internalSearch(input);
      this.setState({ results });
    }, 500)();
  }

  internalSearch = (input) => {
    const data = this.props.roster;
    if (input === '') {
      return data;
    }
    return filter(data, item => (this.depthFirstSearch(item, input)));
  }

  depthFirstSearch = (collection, input) => {
    const type = typeof collection;
    if (type === 'string' || type === 'number' || type === 'boolean') {
      return includes(collection.toString().toLowerCase(), input.toString().toLowerCase());
    }
    return some(collection, item => this.depthFirstSearch(item, input));
  }

  renderResults() {
    if (this.state.results.length === 0) {
      return (
        <View styleName='fill-parent vertical h-center v-center'>
          <Subtitle>No results matching that search</Subtitle>
        </View>
      );
    }
    return (
      <ScrollView>
        <ListView loading={!((this.props.roster && this.props.roster.length))} data={this.state.results} renderRow={this.renderRow}/>
      </ScrollView>
    );
  }

  render = () => (
    <Screen>
      <FormGroup styleName='search'>
        <TextInput
          onChangeText={this.onChangeText}
          placeholder={'Search'}
        />
      </FormGroup>
      { this.renderResults() }
    </Screen>
  )
}

function mapStateToProps(state) {
  return { roster: _.toArray(state.roster) };
}

export default connect(mapStateToProps, actions)(Roster);
