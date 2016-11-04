import {
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILULER
} from '../../constants';

const initialState =
  {
    clubName: '',
    Invoices: [],
    isFetching : true,
    fetched : false,
    err : ''
  }

export default function machines (state = initialState, action) {
  switch (action.type) {
    case FETCH_INVOICES_SUCCESS:
      return Object.assign({}, state, { Invoices: action.response.data, isFetching:false, fetched:true, err:''});

    case FETCH_INVOICES_FAILULER:
      return Object.assign({}, state, { Invoices: action.response.data, isFetching:false, fetched:false, err:err});

    default:
      return state
  }
}
