import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppStyles from '../../styles';
import AppConfig from '../../config';
import CardSection from '../../components/CardSection';

export default class Event extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.event.title,
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name='ios-arrow-back-outline' style={{ marginLeft: 10 }} size={30} color={'#000'} />
      </TouchableOpacity>
    ),
  })

  render() {
    const { event } = this.props.navigation.state.params;
    return (
      <ScrollView>
        {event.image ?
          <Image source={{ uri: event.image }} style={[styles.imageBackground_image]}>
          <Text style={[AppStyles.baseText, styles.listRow_text, styles.listRowImage_text]}>
            {event.title}
          </Text>
          </Image>
        : null}
        <CardSection>
        {event.startdate ?
          <Text>
            When: {event.startdate} to {event.enddate} at {event.starttime} to {event.endtime}
          </Text>
          : <Text>When: {event.date} at {event.starttime} to {event.endtime}</Text>
        }
        </CardSection>
        <CardSection>
        <Text>Where: {event.location}</Text>
        </CardSection>
        <Text style={styles.descriptionText}>Description: {event.summary}</Text>
      </ScrollView>
    );
  }
}

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
      position: 'relative'
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
  }

});
