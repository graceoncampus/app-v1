import firebase from 'firebase';
import moment from 'moment';

export const eventsUpdate = ({ prop, value }) => {
  return {
    type: 'events_update',
    payload: { prop, value }
  };
};

export const eventsCreate = ({
  title,
  summary,
  startdate,
  enddate,
  image,
  location,
  starttime,
  endtime
}) => {
  var startToConvert = startdate + ' ' + starttime;
  var endToConvert = enddate + ' ' + endtime;
  var startdate = moment(startToConvert, 'MM/DD/YYYY HH:mm').unix();
  var enddate = moment(endToConvert, 'MM/DD/YYYY HH:mm').unix();
  var permalink = '';
  var thumbnailURI = '';
  var bannerURI = image;
  const events = firebase.database().ref('events/');
  return (dispatch) => {
    events.push({ title, summary, startdate, enddate, bannerURI, thumbnailURI, location, permalink })
      .then(() => {
        dispatch({ type: 'events_create' });
    });
  };
};

export const eventsFetch = () => {
  const events = firebase.database().ref('events/');
  return (dispatch) => {
  events.on('value', snapshot => {
        dispatch({ type: 'events_fetch', payload: snapshot.val() });
      });
  };
};

export const eventsSave = ({ title, summary, date, image, location, time }) => {
  const events = firebase.database().ref('events/');
  return (dispatch) => {
      events.set({ title, summary, date, image, location, time })
        .then(() => {
          dispatch({ type: 'events_save_success' });
        });
    };
};
