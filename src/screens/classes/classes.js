import React, { Component } from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import { Icon, Screen, Image, View, Caption, Spinner, Row, ListView, Divider, Subtitle } from '@shoutem/ui';
import { connect } from 'react-redux';
import moment from 'moment';
import { classFetch } from '../../actions';

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
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },
  })

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
    };
    this.props.classFetch();
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    const data = nextProps.classData;
    const classes = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        classes.push({
          title: data[key].title,
          summary: data[key].details,
          value: data[key],
          deadline: data[key].deadline,
          instructor: data[key].instructor,
          key,
        });
      }
    }
    this.setState({
      classes,
    });
  }

  renderRow(data) {
    const { title, image, key, deadline, instructor } = data;
    return (
      <TouchableOpacity onPress={() => { this.props.navigation.navigate('Class', { key }); }} >
        <Row>
          { image &&
            <Image
              styleName="small rounded-corners"
              source={{ uri: data.image }}
            />
          }
          <View styleName="vertical stretch space-between">
            <Subtitle>{title}</Subtitle>
            <Caption>{moment.unix(deadline).format('MMMM Do')}  ·  { instructor }</Caption>
          </View>
        </Row>
        <Divider styleName='line' />
      </TouchableOpacity>
    );
  }

  render = () => (
    <Screen>
      {
        this.state.classes.length ?
          <ListView
            data={this.state.classes}
            renderRow={this.renderRow}
          />
          :
          <View styleName='vertical fill-parent v-center h-center'>
            <Spinner size='large'/>
          </View>
      }
    </Screen>
  )
}

const mapStateToProps = ({ ClassReducer }) => {
  const { classData } = ClassReducer;
  return { classData };
};

export default connect(mapStateToProps, { classFetch })(Classes);
