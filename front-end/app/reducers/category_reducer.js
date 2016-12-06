import {
	FETCH_CATEGORIES_SUCCESS,
	FETCH_CATEGORIES_FAILULER,
	EDIT_CATEGORY_SUCCESS,
	EDIT_CATEGORY_FAILULER,
	DELETE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_FAILULER,
	ADD_CATEGORY_SUCCESS,
	ADD_CATEGORY_FAILULER
} from '../../constants';

const initialState =
	{
		AllCategories: [],
		isFetching : true,
		fetched : false,
		err : ''
	}

export default function categories (state = initialState, action) {
	switch (action.type) {
		case FETCH_CATEGORIES_SUCCESS:
			return Object.assign({}, state, { AllCategories: action.response.data, isFetching:false, fetched:true, err:''});

		case FETCH_CATEGORIES_FAILULER:
			return Object.assign({}, state, { AllCategories: '', isFetching:false, fetched:false, err:action.err});

		 case DELETE_CATEGORY_SUCCESS:
			return Object.assign({}, state, { isFetching:false, fetched:true, err:''});

		case DELETE_CATEGORY_FAILULER:
			return Object.assign({}, state, { isFetching:false, fetched:false, err:err});

		case ADD_CATEGORY_SUCCESS:
			let newState = state.AllCategories
			newState.push(action.response.data)
			return Object.assign({}, state, { AllCategories: newState ,isFetching:false, fetched:true, err:''});

		case ADD_CATEGORY_FAILULER:
			return Object.assign({}, state, { isFetching:false, fetched:false, err: action.err});

		default:
			return state
	}
}
