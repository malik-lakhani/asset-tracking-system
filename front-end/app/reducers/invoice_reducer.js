import {
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILULER,
  SET_FIELDS_INVOICES,
  SET_FIELDS_INVOICES_COMPONENT,
  FETCH_ONE_INVOICE_SUCCESS,
  FETCH_ONE_INVOICE_FAILULER
} from '../../constants';

const initialState =
  {
    invoice: '',
    invoicer: '',
    contact: '',
    description: '',
    address: '',

    Invoices: [],
    isFetching : true,
    fetched : false,
    err : '',

    data: [],
  }

export default function invoices (state = initialState, action) {
  switch (action.type) {
    case FETCH_INVOICES_SUCCESS:
      return Object.assign({}, state, { Invoices: action.response.data, isFetching:false, fetched:true, err:''});

    case FETCH_INVOICES_FAILULER:
      return Object.assign({}, state, { Invoices: action.response.data, isFetching:false, fetched:false, err:err});

    case FETCH_ONE_INVOICE_SUCCESS:
      console.log("action - > ", action)

      console.log(this.state, "<-")
      // return Object.assign({}, state, { Invoices: "bbb  ", isFetching:false, fetched:false, err:"err"});

    case FETCH_ONE_INVOICE_FAILULER:
      // return Object.assign({}, state, { Invoices: "aaa", isFetching:false, fetched:false, err:"err"});


    case SET_FIELDS_INVOICES:
      console.log("from invoice reducer : ", action)
      let newState = {};
      newState[action.field] = action.value;
      return Object.assign({}, state, newState);

     case SET_FIELDS_INVOICES_COMPONENT:
      let componentIndex = action.field.split('_')[1];
      var warranty = state.data;
      if (warranty[componentIndex]) {
        warranty[componentIndex][action.field] = action.value;
      } else {
        var warrantyObj = {};
        warrantyObj[action.field] = action.value;
        warranty.push(warrantyObj);
      }

      return Object.assign({}, state.data, state);

    default:
      return state
  }
}
