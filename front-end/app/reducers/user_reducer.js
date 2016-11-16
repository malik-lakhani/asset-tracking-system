import {
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILULER,
	EDIT_USER_SUCCESS,
	EDIT_USER_FAILULER,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILULER
} from '../../constants';

const initialState =
	{
		AllUsers: [],
		isFetching : true,
		fetched : false,
		err : ''
	}

export default function users (state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_SUCCESS:
			return Object.assign({}, state, { AllUsers: action.response.data, isFetching:false, fetched:true, err:''});

		case FETCH_USERS_FAILULER:
			return Object.assign({}, state, { AllUsers: action.response.data, isFetching:false, fetched:false, err:err});

		case DELETE_USER_SUCCESS:
			return Object.assign({}, state, { isFetching:false, fetched:true, err:''});

		case DELETE_USER_FAILULER:
			return Object.assign({}, state, { isFetching:false, fetched:false, err:err});

		default:
			return state
	}
}
