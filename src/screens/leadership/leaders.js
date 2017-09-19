import React, { Component } from 'react';
import { TouchableOpacity, Image, Tile, GridRow, Screen, ListView, View, Caption, Icon, Subtitle } from '@shoutem/ui';

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
    email: 'mattng@email.com',
  },
  {
    title: 'Ray Fung',
    summary: 'Ray is a 3rd year seminary student at The Masters Seminary and also working at Grace Community Church as the STM coordinator. He was born and raised in Oakland and went to the same high school as Chris Gee. His role as an undershepherd is to assist Chris and also serve the students. He will be leading a small group and teaching a few MyGOC classes this year. His personal interests are playing Call of Duty, and working out. Feel free to contact him if you want to do either of the two things.',
    image: require('../../images/rayfung.jpg'),
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
  {
    title: 'Phil and Loretta Haw',
    summary: 'Loretta and Phil are from Fresno and Selma. They are graduates of Fresno State and met when their accounting professors seated them side by side. After a year of courtship, they married. They have two married daughters, two grandsons, four granddaughters and one great grandson. They moved their membership to Grace Community Church in 1973 after moving the Southern California and have served in many ministries. The longest have been choir, the Board of Elders, Crossroads, and Every Women’s Grace. They have served on staff at GOC UCLA for eight years. They have enjoyed serving by counseling, encouraging, and participating in all GOC/Welcome activities.',
    image: require('../../images/phil.jpg'),
  },
  {
    title: 'Tim and Jaime Huang',
    summary: 'Tim is thankful to be a part of a church that is committed to loving and abiding by God’s Word. As staff, he has a passion for young people to know Jesus as their Lord and Savior, and to equip them to serve the local church. He loves to disciple students, counseling them in areas of spiritual disciplines, leadership, relationships and career. Tim and his wife Jaime met at UCLA when they were undergrads, and are blessed with three kids. He currently works as an engineer in the defense industry.',
    image: require('../../images/tim.jpg'),
  },
  {
    title: 'Tim and Patty Peters',
    summary: 'Tim is a retired sheriff who loves fly fishing and discipling men. Whenever possible, he does both at the same time. Tim has served as an elder at Grace Church, including four years as the chairman of the elder board. Tim and his wife Patti have been serving at Grace on Campus since 2003. They have two children and five grandchildren.',
    image: require('../../images/timpeters.jpg'),
  },
  {
    title: 'Paul and Peggy Ushijima',
    summary: 'Paul and Peggy became Christians (Paul in 1978 and Peggy in 1971), met in a Bible study and were married in 1979. They have served at Grace Church since 1986 in various ministries including: Children’s, Adult, Senior and Outreach before coming to Crossroads/GOC in 2003. Paul also served as an Elder at Grace Church. They work with the GOC men (Paul) and women (Peggy) meeting with individuals, Small Group Leaders and staff for fellowship, discipleship and counseling. Paul received a B.S./Design from Illinois Institute of Technology. Peggy earned a B.A./Math from UCSD.',
    image: require('../../images/paul.jpg'),
  },
  {
    title: 'Andrew and Judy Williamson',
    summary: 'Andrew and Judy have served at UCLA Grace on Campus since 2000. They have previously served in other ministries at Grace Community Church including Fundamentals of the Faith and Grace Life. Judy received a Bachelor of Science and Master of Science in Nursing from UCLA and previously attended GOC as a student and staff person. Andrew received a Bachelor of Commerce degree from the University of Western Australia and an MBA from the Anderson School at UCLA. They have four children: Joshua, Jenna, John and Daniel.',
    image: require('../../images/williamsons.jpg'),
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
    headerStyle: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ecedef', paddingTop: 20 },
    headerTitleStyle: { fontFamily: 'Akkurat-Regular', fontSize: 15, color: '#222222', lineHeight: 18 },

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
      <Screen styleName="paper">
        <ListView
          data={groupedData}
          renderRow={this.renderRow}
          style={{
            listContent: {
              padding: 15,
            },
          }}
        />
      </Screen>
    );
  }
}
