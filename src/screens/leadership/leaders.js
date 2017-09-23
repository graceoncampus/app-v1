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
  {
    title: 'Matt Ng',
    summary: 'Matt was born and raised in San Francisco and came to Los Angeles in 2007 to attend UCLA, at which point he became involved at Grace Community Church. Currently, Matt is studying at The Master’s Seminary and working at Grace’s coffee shop, Steeple House Coffee. He is involved with discipling students, coming alongside Chris in providing oversight, and alternately leading music in Crossroads. Matt is married to his wife Kimmie, who is a kindergarten teacher. Matt and Kimmie can be found hosting friends, eating sushi, and exploring coffee shops.',
    image: require('../../images/mattng.jpg'),
    position: 'Undershepherd',
  },
  {
    title: 'David Chow',
    summary: 'David grew up in Sacramento, CA in a Christian home but it wasn’t until junior high that God revealed the weight of his sin and that he is redeemed only through Jesus Christ who died for all his sin. In 2005 he came to UCLA and studied International Development Studies and began working for the Federal Gov’t in 2009. Today his passion is to help disciple GOC, especially young men who want to grow in the Lord. Other interests are photography, basketball, reading a solid book, and eating good food!',
    image: require('../../images/davidchow.jpg'),
    position: 'Undershepherd',
  },
  {
    title: 'Austin Chiang',
    summary: 'Austin graduated from UCLA in 2013 with a B.S. in Mathematics/Economics but could not leave his favorite college ministry of all-time, Grace on Campus, because of the indelible impact it has made upon his soul. He is currently working as a test engineer in the software industry and is actively involved in various teaching ministries, discipleship relationships, and higher-level oversight at GOC. His interests include studying at coffee shops, talking theology, playing badminton, and watching the UCLA men’s basketball team rise back to national prominence. U-C-L-A fight fight fight!',
    image: require('../../images/austinc.jpg'),
    position: 'Undershepherd',
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
    headerRight: <View />,  headerStyle: { backgroundColor: '#fff', ...Platform.select({ ios: { marginTop: 0, paddingTop: 20 }, android: { elevation: 0,  height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12 } }), borderBottomWidth: 1, borderBottomColor: '#ecedef' },
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
