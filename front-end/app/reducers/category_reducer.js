import {
	FETCH_CATEGORIES_SUCCESS,
	FETCH_CATEGORIES_FAILULER,
	EDIT_CATEGORY_SUCCESS,
	EDIT_CATEGORY_FAILULER,
	DELETE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_FAILULER
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
			return Object.assign({}, state, { AllCategories: action.response.data, isFetching:false, fetched:false, err:err});

		 case DELETE_CATEGORY_SUCCESS:
			return Object.assign({}, state, { isFetching:false, fetched:true, err:''});

		case DELETE_CATEGORY_FAILULER:
			return Object.assign({}, state, { isFetching:false, fetched:false, err:err});

		default:
			return state
	}
}
