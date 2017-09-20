import firebase from 'firebase';
import moment from 'moment';

export const eventsUpdate = ({ prop, value }) => ({
  type: 'events_update',
  payload: { prop, value },
});

export const eventsCreate = ({
  title,
  summary,
  startdate,
  enddate,
  image,
  location,
  starttime,
  endtime,
}) => {
  const startToConvert = `${startdate} ${starttime}`;
  const endToConvert = `${enddate} ${endtime}`;
  const start = moment(startToConvert, 'MM/DD/YYYY HH:mm').unix();
  const end = moment(endToConvert, 'MM/DD/YYYY HH:mm').unix();
  const permalink = '';
  const thumbnailURI = '';
  const bannerURI = image;
  const events = firebase.database().ref('events/');
  return (dispatch) => {
    events.push({ title, summary, startdate: start, enddate: end, bannerURI, thumbnailURI, location, permalink })
      .then(() => {
        dispatch({ type: 'events_create' });
      });
  };
};

export const eventsFetch = () => {
  const events = firebase.database().ref('events/');
  return (dispatch) => {
    events.on('value', (snapshot) => {
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
