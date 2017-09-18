const INITIAL_STATE = {
  title: '',
  summary: '',
  startdate: '',
  enddate: '',
  location: 'unknown',
  image: null,
  starttime: '',
  endtime: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'events_update':
      return { ...state, [action.payload.prop]: action.payload.value };
      case 'events_create':
        return INITIAL_STATE;
      case 'events_save_success':
        return INITIAL_STATE;
      default:
        return state;
  }
};
