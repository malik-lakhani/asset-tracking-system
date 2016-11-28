import {
	FETCH_INCIDENTS_SUCCESS,
	FETCH_INCIDENTS_FAILULER,
	SET_FIELDS,
	RESET_STATE_INCIDENTS,
	FETCH_INCIDENT_INFORMATION_SUCCESS,
	FETCH_INCIDENT_INFORMATION_FAILULER,
	ADD_INCIDENT_UPDATE_SUCCESS,
	ADD_INCIDENT_UPDATE_FAILULER
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
			return Object.assign({}, state, { Incidents : '', isFetching:false, fetched:false, err:err});

		case SET_FIELDS:
			state[action.field] = action.value;
			return Object.assign({}, state, { state });

		case RESET_STATE_INCIDENTS:
			state['description'] = ''
			state['title'] = ''
			state['recorder'] = ''
			state['machine'] = ''

		case FETCH_INCIDENT_INFORMATION_SUCCESS:
			return Object.assign({}, state, { Incidents : action.response.data, isFetching:false, fetched:true, err:''});

		case FETCH_INCIDENT_INFORMATION_FAILULER:
			return Object.assign({}, state, { Incidents :'', isFetching:false, fetched:true, err:action.err});

		case ADD_INCIDENT_UPDATE_SUCCESS:
			console.log('ADD_INCIDENT_UPDATE_SUCCESS');

		case ADD_INCIDENT_UPDATE_FAILULER:
			console.log('ADD_INCIDENT_UPDATE_FAILULER');

		default:
			return state
	}
}
