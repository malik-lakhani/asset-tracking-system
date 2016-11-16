import {
	FETCH_COMPONENTS_SUCCESS,
	FETCH_COMPONENTS_FAILULER,
	FETCH_COMPONENT_INFORMATION_SUCCESS,
	FETCH_COMPONENT_INFORMATION_FAILULER,
	FILTER_COMPONENTS_SUCCESS,
	FILTER_COMPONENTS_FAILULER
} from '../../constants';

const initialState =
	{
		Components: [],
		isFetching : true,
		fetched : false,
		err : ''
	}

export default function components (state = initialState, action) {
	switch (action.type) {
		case FETCH_COMPONENTS_SUCCESS:
			return Object.assign({}, state, { Components: action.response.data, isFetching:false, fetched:true, err:''});

		case FETCH_COMPONENTS_FAILULER:
			return Object.assign({}, state, { Components: action.response.data, isFetching:false, fetched:false, err:err});

		case FETCH_COMPONENT_INFORMATION_SUCCESS:
			return Object.assign({}, state, { Components: action.response.data, isFetching:false, fetched:true, err:''});

		case FETCH_COMPONENT_INFORMATION_FAILULER:
			return Object.assign({}, state, { Components: action.response.data, isFetching:false, fetched:false, err:err});

		case FILTER_COMPONENTS_SUCCESS:
			return Object.assign({}, state, { Components: action.response.data, isFetching:false, fetched:true, err:''});

		case FILTER_COMPONENTS_FAILULER:
			return Object.assign({}, state, { Components: action.response.data, isFetching:false, fetched:false, err:err});

		default:
			return state
	}
}
