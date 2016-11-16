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
		Invoice_date: '',
		components: [],

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
			state.invoice = action.response.data.Invoice_number;
			state.invoicer = action.response.data.Invoicer_name;
			state.contact = action.response.data.Contact;
			state.description = action.response.data.Description;
			state.address = action.response.data.Address;
			state.Invoice_date = action.response.data.Invoice_date;
			state.components = action.response.data.Components;
			return Object.assign({}, state, { Invoices: state, isFetching:false, fetched:false, err:"err"});

		case FETCH_ONE_INVOICE_FAILULER:
			return Object.assign({}, state, { Invoices: '', isFetching:false, fetched:false, err:'err'});

		case SET_FIELDS_INVOICES:
			state[action.field] = action.value;
			return Object.assign({}, state, { state });

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
