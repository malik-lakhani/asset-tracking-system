import {
	FETCH_MACHINES_SUCCESS,
	FETCH_MACHINES_FAILULER,
	FETCH_MACHINES_INFORMATION_SUCCESS,
	FETCH_MACHINES_INFORMATION_FAILULER,
	ADD_MACHINE_SUCCESS,
	ADD_MACHINE_FAILULER,
	EDIT_MACHINE_SUCCESS,
	EDIT_MACHINE_FAILULER,
	DELETE_MACHINE_SUCCESS,
	DELETE_MACHINE_FAILULER
} from '../../constants';

const initialState =
	{
		Machines: [],
		MachineInfo: [],
		isFetching : true,
		fetched : false,
		status: {},
		err : ''
	}

export default function machines (state = initialState, action) {
	switch (action.type) {
		case FETCH_MACHINES_SUCCESS:
			return Object.assign({}, state, { Machines: action.response.data, isFetching:false, fetched:true, err:''});

		case FETCH_MACHINES_FAILULER:
			return Object.assign({}, state, { Machines: '', isFetching:false, fetched:false, err:action.err});

		case FETCH_MACHINES_INFORMATION_SUCCESS:
			return Object.assign({}, state, { MachineInfo: action.response.data, isFetching:false, fetched:true, err:''});

		case FETCH_MACHINES_INFORMATION_FAILULER:
			return Object.assign({}, state, { MachineInfo: '', isFetching:false, fetched:false, err:action.err});

		case EDIT_MACHINE_SUCCESS:
			return Object.assign({}, state, { status: action.data, isFetching:false, fetched:true, err:''});

		case EDIT_MACHINE_FAILULER:
			return Object.assign({}, state, { status: '', isFetching:false, fetched:false, err:action.err});

		case DELETE_MACHINE_SUCCESS:
			return Object.assign({}, state, { status: action.data, isFetching:false, fetched:true, err:''});

		case DELETE_MACHINE_FAILULER:
			return Object.assign({}, state, { status: '', isFetching:false, fetched:false, err:action.err});

		case ADD_MACHINE_SUCCESS:
			let newState = state.Machines
			newState.push(action.response.data)
			return Object.assign({}, state, { Machines: newState ,status: '', isFetching:false, fetched:false, err:action.err});

		case ADD_MACHINE_FAILULER:
			return Object.assign({}, state, { status: action.data, isFetching:false, fetched:true, err:''});

		default:
			return state
	}
}
