import React, { Component } from 'react';
import { TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Image, Tile, GridRow, Screen, ListView, View, Caption, Icon, Subtitle } from '@shoutem/ui';

const defaultData = [
  {
    title: 'Chris Gee',
    summary: 'As the shepherd of Grace on Campus, Chris provides vision and oversight to the Bible Study, preaches weekly, and equips students for serving in the church and reaching the UCLA campus with the Gospel of Jesus Christ. He studied Mass Communication and English at UCLA and then moved on to earn his M.Div. and Th.M. degrees at The Master’s Seminary. He has been married to his wife Linda since 2011, and together they have the joy of raising two spunky and rambunctious sons. It has been said of Chris that he is “trapped in the 90s” as evidenced by his love for polo shirts, Nike Air Force 1’s, Nintendo 64, and phrases like “fo’ sho’” and “you da man.” During his free time, Chris enjoys playing basketball, but it’s mainly for the cardio.',
    image: require('../../images/chrisgee.jpg'),
    position: 'Shepherd',
  },
];


export default class Leaders extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Leadership',
    }),
    title: 'LEADERSHIP',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="sidebar" style={{ paddingLeft: 10 }}/>
      </TouchableOpacity>
    ),
    headerRight: <View />, headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0, height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
    headerTitleStyle: { alignSelf: 'center', fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },

  })

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, sectionId, index) {
    const cellViews = rowData.map((leader, id) => (
      <TouchableOpacity
        key={id}
        style={{ paddingBottom: 15 }}
        onPress={() => (
          this.props.navigation.navigate('Leader', { leader }))
        }
      >
        <Tile styleName="small clear">
          <Image
            styleName="medium-square"
            source={leader.image}
          />
          <View style={{ paddingTop: 8 }} styleName="content">
            <Subtitle style={{ marginBottom: 1 }} numberOfLines={2}>{leader.title}</Subtitle>
            { leader.position &&
              <Caption>{leader.position}</Caption>
            }
          </View>
        </Tile>
      </TouchableOpacity>
    ));
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  render = () => {
    const groupedData = GridRow.groupByRows(defaultData, 2, () => (1));
    return (
      <Screen style={{ backgroundColor: '#f9f9f9' }}>

        <ListView
          data={groupedData}
          renderRow={this.renderRow}
          style={{
            backgroundColor: '#f9f9f9',
            listContent: {
              padding: 15,
            },
          }}
        />
      </Screen>
    );
  }
}
