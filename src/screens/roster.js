import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Icon, Screen, Image, Row, ListView, FormGroup, View, Spinner, TextInput, Divider, Subtitle } from '@shoutem/ui'; import { connect } from 'react-redux';
import _ from 'lodash';
import { filter, some, includes } from 'lodash/collection';
import { debounce } from 'lodash/function';

import * as actions from '../actions/';

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
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
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
    <TouchableOpacity>
      <Row styleName="small">
        <Image
          styleName="small-avatar"
          source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-9.png' }}
        />
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
    if (this.props.roster.length) {
      if (this.state.results.length) {
        return (
          <ScrollView>
            <ListView data={this.state.results} renderRow={this.renderRow}/>
          </ScrollView>
        );
      }
      return (
        <View styleName='fill-parent vertical h-center v-center'>
          <Subtitle>No results matching that search</Subtitle>
        </View>
      );
    }
    return (
      <View styleName='fill-parent vertical h-center v-center'>
        <Spinner size='large'/>
      </View>
    );
  }

  render = () => (
    <Screen>
      <FormGroup styleName='search'>
        <TextInput
          onChangeText={this.onChangeText}
          placeholder={'Search by First or Last Name'}
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
