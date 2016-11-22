import {
	FETCH_MACHINES_SUCCESS,
	FETCH_MACHINES_FAILULER,
	FETCH_MACHINES_INFORMATION_SUCCESS,
	FETCH_MACHINES_INFORMATION_FAILULER
} from '../../constants';

const initialState =
	{
		Machines: [],
		isFetching : true,
		fetched : false,
		err : ''
	}

export default function machines (state = initialState, action) {
	switch (action.type) {
		case FETCH_MACHINES_SUCCESS:
			return Object.assign({}, state, { Machines: action.response.data, isFetching:false, fetched:true, err:''});

		case FETCH_MACHINES_FAILULER:
			return Object.assign({}, state, { Machines: '', isFetching:false, fetched:false, err:action.err});

		case FETCH_MACHINES_INFORMATION_SUCCESS:
			return Object.assign({}, state, { Machines: action.response.data, isFetching:false, fetched:true, err:''});

		case FETCH_MACHINES_INFORMATION_FAILULER:
			return Object.assign({}, state, { Machines: '', isFetching:false, fetched:false, err:action.err});

		default:
			return state
	}
}
