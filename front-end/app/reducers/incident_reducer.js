import {
  FETCH_INCIDENTS_SUCCESS,
  FETCH_INCIDENTS_FAILULER,
  SET_FIELDS
} from '../../constants';

const initialState =
  {
    Incidents : [],
    isFetching : true,
    fetched : false,
    err : '',

    description: '',
    title: '',
    recorder: '',
    machine: ''
  }

export default function incidents (state = initialState, action) {
  switch (action.type) {
    case FETCH_INCIDENTS_SUCCESS:
      return Object.assign({}, state, { Incidents : action.response.data, isFetching:false, fetched:true, err:''});

    case FETCH_INCIDENTS_FAILULER:
      return Object.assign({}, state, { Incidents : action.response.data, isFetching:false, fetched:false, err:err});

    case SET_FIELDS:
     console.log('from reducer of incidents :', action);
      let newState = {};
      newState[action.field] = action.value;
      console.log('from reducer of set field of incidents :', newState);
      return Object.assign({}, state, newState);

    default:
      return state
  }
}
