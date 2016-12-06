import {
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILULER,
	EDIT_USER_SUCCESS,
	EDIT_USER_FAILULER,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILULER,
	ADD_USER_SUCCESS,
	ADD_USER_FAILULER,
} from '../../constants';

const initialState =
	{
		AllUsers: [],
		isFetching : true,
		fetched : false,
		err : '',
		status: {},

		edited: false
	}

export default function users (state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_SUCCESS:
			return Object.assign({}, state, { AllUsers: action.response.data, isFetching:false, fetched:true, err:'', edited: false});

		case FETCH_USERS_FAILULER:
			return Object.assign({}, state, { AllUsers: '', isFetching:false, fetched:false, err:action.err});

		case DELETE_USER_SUCCESS:
			return Object.assign({}, state, { status: action.data, isFetching:false, fetched:true, err:''});

		case DELETE_USER_FAILULER:
			return Object.assign({}, state, { status: '', isFetching:false, fetched:false, err:action.err});

		case EDIT_USER_SUCCESS:
			return Object.assign({}, state, { AllUsers: '', isFetching:false, fetched:true, edited:true, err:action.err});

		case EDIT_USER_FAILULER:
			return Object.assign({}, state, { AllUsers: '', isFetching:false, fetched:true, edited:false, err:action.err});

		case ADD_USER_SUCCESS:
			let newState = state.AllUsers
			newState.push(action.response.data)
			return Object.assign({}, state, { AllUsers: newState, isFetching:false, fetched:true, edited:false, err:''});

		case ADD_USER_FAILULER:
			return Object.assign({}, state, { isFetching:false, fetched:true, edited:false, err: action.err});

		default:
			return state
	}
}
