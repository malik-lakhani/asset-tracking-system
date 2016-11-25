import axios from 'axios';
import querystring from 'querystring';
import { push } from 'react-router-redux'
import moment from 'moment';

import {

	SET_FIELDS,

	FETCH_USERS_SUCCESS, FETCH_USERS_FAILULER, EDIT_USER_SUCCESS, EDIT_USER_FAILULER,
		DELETE_USER_SUCCESS, DELETE_USER_FAILULER, ADD_USER_SUCCESS, ADD_USER_FAILULER,

	FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILULER, EDIT_CATEGORY_SUCCESS, EDIT_CATEGORY_FAILULER,
		DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILULER, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILULER,

	FETCH_MACHINES_SUCCESS, FETCH_MACHINES_FAILULER, EDIT_MACHINE_SUCCESS, EDIT_MACHINE_FAILULER,
		DELETE_MACHINE_SUCCESS, DELETE_MACHINE_FAILULER,FETCH_MACHINES_INFORMATION_SUCCESS,
		FETCH_MACHINES_INFORMATION_FAILULER,

	FETCH_COMPONENTS_SUCCESS, FETCH_COMPONENTS_FAILULER, FETCH_COMPONENT_INFORMATION_SUCCESS,
		FETCH_COMPONENT_INFORMATION_FAILULER, FILTER_COMPONENTS_SUCCESS, FILTER_COMPONENTS_FAILULER,

	FETCH_INVOICES_SUCCESS, FETCH_INVOICES_FAILULER, SET_FIELDS_INVOICES, SET_FIELDS_INVOICES_COMPONENT,
		FETCH_ONE_INVOICE_SUCCESS, FETCH_ONE_INVOICE_FAILULER, RESET_STATE_INVOICES,

	FETCH_INCIDENTS_SUCCESS,FETCH_INCIDENTS_FAILULER, RESET_STATE_INCIDENTS, FETCH_INCIDENT_INFORMATION_SUCCESS,
	FETCH_INCIDENT_INFORMATION_FAILULER, ADD_INCIDENT_UPDATE_SUCCESS, ADD_INCIDENT_UPDATE_FAILULER

} from '../../constants';

export const setFieldValue = (field, value) => ({
	type: SET_FIELDS,
	field,
	value,
});

//========================Actions Releated to Users=============================

export const fetchUsers = ((All, dispatch) => {
	const URL = `http://localhost:8000/users`;
	let all = false;

	if(All == true){
		all = true;
	}
	return function(dispatch) {
		axios.get(URL, { params: { all: all }})
			.then((response) => {
				dispatch({ type: FETCH_USERS_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_USERS_FAILULER, err})
			})
		}
});

export const deleteUser = ((id) => {
	let url = `http://localhost:8000/users/${id[0]}` ;

	//======To delete multiple user in one attempt =====
	for(let i=1; i<id.length; i++){
		url += ','+id[i]
	}
	//==================================================

	return function() {
		axios({
			method: 'delete',
			url: url
		})
			.then((response) => {
				console.log(DELETE_USER_SUCCESS);
			})
			.catch((err) => {
				console.log(DELETE_USER_FAILULER, ':', err);
			})
		}
});

export const editUser = ((row, machineId) => {
	let url = `http://localhost:8000/users/${row.Id}` ;
	axios.patch(url,
		querystring.stringify({
			'name' : row.Name,
			'company_email' : row.Company_email,
			'machine_id' : machineId
		})).then(function(response) {
				console.log('Response : ', response);
		}).catch(function (err) {
				console.log('Error From patch User : ', err);
		});
});

export const addUser = ((row, machineId) => {
	const url = `http://localhost:8000/users`;
	return function() {
		axios.post(url,
			querystring.stringify({
				'name' : row.Name,
				'company_email' : row.Company_email,
				'machine_id' : machineId
			}))
		}
});

//==============================================================================





//========================Actions Releated to Categories =======================

export const fetchCatogories = ((All, dispatch) => {
	const URL = `http://localhost:8000/components/categories`;
	let all = false;

	if(All == true){
		all = true;
	}
	return function(dispatch) {
		axios.get(URL, { params: { all: all }})
			.then((response) => {
				dispatch({ type: FETCH_CATEGORIES_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_CATEGORIES_FAILULER, err})
			})
		}
});

export const deleteCategory = ((id) => {
	let url = `http://localhost:8000/components/categories/${id[0]}` ;

	//======To delete multiple user in one attempt =====
	for(let i=1; i<id.length; i++){
		url += ','+id[i]
	}
	//==================================================

	return function() {
		axios({
			method: 'delete',
			url: url
		})
			.then((response) => {
				console.log(DELETE_CATEGORY_SUCCESS);
			})
			.catch((err) => {
				console.log(DELETE_CATEGORY_FAILULER, ':', err);
			})
		}
});

export const editCategory = ((row) => {
	let url = `http://localhost:8000/components/categories/${row.Id}` ;
	axios.patch(url,
		querystring.stringify({
			'category' : row.Category,
			'description' : row.Description,
		})).then(function(response) {
				console.log('success');
		});


});

export const addCategory = ((row, machineId) => {
	const url = `http://localhost:8000/components/categories`;
	return function() {
		axios.post(url,
			querystring.stringify({
				'category' : row.Category,
				'description' : row.Description,
			}))
		}
});

//==============================================================================






//========================Actions Releated to Machines =========================
export const fetchMachines = ((Action, dispatch) => {
	const URL = `http://localhost:8000/machines`;
	let allMachine = true;

	if(Action == false){
		allMachine = false;
	}
	return function(dispatch) {
		axios.get(URL, { params: { all: allMachine }})
			.then((response) => {
				dispatch({ type: FETCH_MACHINES_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_MACHINES_FAILULER, err})
			})
		}
});

export const deleteMachine = ((id) => {
	let url = `http://localhost:8000/machines/${id[0]}` ;

	//======To delete multiple user in one attempt =====
	for(let i=1; i<id.length; i++){
		url += ','+id[i]
	}
	//==================================================

	return function() {
		axios({
			method: 'delete',
			url: url
		})
			.then((response) => {
				console.log(DELETE_MACHINE_SUCCESS);
			})
			.catch((err) => {
				console.log(DELETE_MACHINE_FAILULER, ':', err);
			})
		}
});

export const editMachine = ((row) => {
	let url = `http://localhost:8000/machines/${row.Id}` ;
	axios.patch(url,
		querystring.stringify({
			'name' : row.Name,
		})).then(function(response) {
				console.log('Response : ', response);
		}).catch(function (err) {
				console.log('Error From patch User : ', err);
		});
});

export const addMachine = ((row) => {
	let url = `http://localhost:8000/machines`;
	return function() {
		axios.post(url,
			querystring.stringify({
				name: row.Name
			})).then(function(response) {
				console.log('added successfully', response);
		});
	}
});

export const fetchMachineInformation = ((machineId) => {
	const URL = `http://localhost:8000/machines/${machineId}/components`;
	return function(dispatch) {
		axios.get(URL)
			.then((response) => {
				dispatch({ type: FETCH_MACHINES_INFORMATION_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_MACHINES_INFORMATION_FAILULER, err})
			})
		}
});

//==============================================================================




//========================Actions Releated to Components========================

export const fetchComponents = ((Action, dispatch) => {
	const URL = `http://localhost:8000/components`;
	let allComponents = false;

	if(Action == true) {
		allComponents = true;
	}
	return function(dispatch) {
		axios.get(URL, { params: { all: allComponents }})
			.then((response) => {
				dispatch({ type: FETCH_COMPONENTS_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_COMPONENTS_FAILULER, err})
			})
		}
});

export const filterComponents = ((category_id) => {
	const URL = `http://localhost:8000/components/filter`;

	return function(dispatch) {
		axios.get(URL, { params: { category_id: category_id }})
			.then((response) => {
				dispatch({ type: FILTER_COMPONENTS_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FILTER_COMPONENTS_FAILULER, err})
			})
		}
});

export const fetchComponentDetails = ((componentId, dispatch) => {
	let URL = `http://localhost:8000/components/${componentId}`
	let allComponents = false;
	return function(dispatch) {
		axios.get(URL)
			.then((response) => {
				dispatch({ type: FETCH_COMPONENT_INFORMATION_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_COMPONENT_INFORMATION_FAILULER, err})
			})
		}
});

export const changeMachine = ((componentId, machineId) => {
	let URL = `http://localhost:8000/machines/${machineId}/components`
	return function() {
		axios.post(URL,
			querystring.stringify({
				'component_id' : componentId
			})).then((response) => {
				let URL = `http://localhost:8080/public/#/components/${componentId}`
				location.assign(URL);
			})
			.catch((err) => {
				console.log('Error:', err)
			})
		}
});

export const decommitComponentFromMachine = ((componentId, machineId) => {
	let URL = `http://localhost:8000/machines/${machineId}/components/${componentId}`
	return function() {
		axios({
			method: 'delete',
			url: URL
		})
			.then((response) => {
				console.log("Response decommitte component:", response);
				location.reload();
			})
			.catch((err) => {
				console.log("Eroor from decommitte component :", err);
			})
		}

});

//==============================================================================




//========================Actions Releated to Invoices==========================

export const fetchInvoices = ((dispatch) => {
	const URL = `http://localhost:8000/invoices`;
	return function(dispatch) {
		axios.get(URL)
			.then((response) => {
				dispatch({ type: FETCH_INVOICES_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_INVOICES_FAILULER, err})
			})
		}
});

export const fetchInvoiceDetails = ((invoiceId) => {
	const URL = `http://localhost:8000/invoices/${invoiceId}`;;
	return function(dispatch) {
		axios.get(URL)
			.then((response) => {
				dispatch({ type: FETCH_ONE_INVOICE_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_ONE_INVOICE_FAILULER, err})
			})
		}
});

export const setFieldForInvoice = (field, value) => ({
	type: SET_FIELDS_INVOICES,
	field,
	value
});

export const setFieldForComponent = (field, value) => ({
	type: SET_FIELDS_INVOICES_COMPONENT,
	field,
	value
});

export const addInvoice = ((data) => {
	//if invoide date not selected than it take the today's date as invoice date..
	if(data.Invoice_date == '') {
		data.Invoice_date = moment()
	}
	let serialNos = [];
	let names = [];
	let warrantyDate = [];
	let descriptions = [];
	let category = [];

	for (let i=0; i< data.data.length; i++ ) {
			serialNos[i] = data.data[i]["serial_" + i]
			names[i] = data.data[i]["component_" + i]
			//if warranty date not selected for component, it will taken date of today ...
			if(data.data[i]["date_" + i] == undefined) {
				data.data[i]["date_" + i] = moment();
			}
			warrantyDate[i] = data.data[i]["date_" + i].toDate();
			descriptions[i] = data.data[i]["description_" + i]
			category[i] = data.data[i]["category_" + i]
		}

	let invoicer_details = {
		name: data.invoicer,
		address: data.address,
		contact: data.contact
	}

	let component_details = {
		serial_no: serialNos,
		name: names,
		warranty_till: warrantyDate,
		description: descriptions,
		category: category
	}

	let invoice = {
		number: data.invoice,
		description: data.description,
		date: data.Invoice_date,
		invoicer_details: invoicer_details,
		component_details: component_details
	}

	const URL = `http://localhost:8000/invoices`;
	return function(dispatch) {
		axios.post(URL, invoice)
			.then(function (response) {
				resetStateInvoices(dispatch);
				location.assign(`http://localhost:8080/public/#/invoices`);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
});

export const editInvoice = (Id, data) => {
	let date = data.Invoice_date
	if(typeof(data.Invoice_date) == "object" ) {
		date = data.Invoice_date.format()
	}

	let url = `http://localhost:8000/invoices/${Id}` ;
	return function( dispatch) {
	axios.patch(url,
		querystring.stringify({
			'invoice' : data.invoice,
			'invoicer' : data.invoicer,
			'address' : data.address,
			'contact': data.contact,
			'description' : data.description,
			'date' : date
		}))
		.then(function(response) {
			location.assign(`http://localhost:8080/public/#/invoices/`);
		})
		.catch(function (err) {
				console.log("Error")
		});
	}
}

function resetStateInvoices (dispatch) {
	dispatch({ type: RESET_STATE_INVOICES})
}
//==============================================================================




//========================Actions Releated to Incidents=========================

export const fetchIncidents = ((Action) => {
	const URL = `http://localhost:8000/incidents`;
	let allIncidents = false;

	if(Action == true) {
		allIncidents = true;
	}
	return function(dispatch) {
		axios.get(URL, { params: { all: allIncidents }})
			.then((response) => {
				dispatch({ type: FETCH_INCIDENTS_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_INCIDENTS_FAILULER, err})
			})
		}
});

export const addIncident = ((component, recorder, title, description, dispatch) => {
	const URL = `http://localhost:8000/incidents`;
	let data = {
		component_id: component,
		recorder: recorder,
		title: title,
		description: description
	}
	return function( dispatch) {
		axios.post(URL, data)
			.then(function (response) {
				resetStateIncidents(dispatch)
				location.assign(`http://localhost:8080/public/#/incidents/`);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
});

export const editIncident = ((row, componentId) => {
	let url = `http://localhost:8000/incidents/${row.Id}` ;
	axios.patch(url,
		querystring.stringify({
			'title' : row.Title,
			'description' : row.Description,
			'recorder' : row.Recorder,
			'component_id': componentId
		})).then(function(response) {
				console.log('Response : ', response);
		}).catch(function (err) {
				console.log('Error From patch User : ', err);
		});
});

function resetStateIncidents (dispatch) {
	dispatch({ type: RESET_STATE_INCIDENTS})
}

export const fetchIncidentInfo = ((incidentId) => {
	let url = `http://localhost:8000/incidents/${incidentId}/incidentInfo`;
	return function(dispatch) {
		axios.get(url)
			.then((response) => {
				dispatch({ type: FETCH_INCIDENT_INFORMATION_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_INCIDENT_INFORMATION_FAILULER, err})
			})
		}
});

export const addIncidentUpdate = ((incidentId, resolvedBy, description) => {
	let url = `http://localhost:8000/incidents/${incidentId}/update`;

	return function(dispatch) {
		axios.post(url, querystring.stringify({
			description: description,
			resolvedBy: resolvedBy
		}))
			.then(function (response) {
				dispatch({ type: ADD_INCIDENT_UPDATE_SUCCESS, response})
				location.assign(`http://localhost:8080/public/#/incidents/${incidentId}`);
			})
			.catch(function (err) {
				dispatch({ type: ADD_INCIDENT_UPDATE_FAILULER, err})
			});
		}
});
//==============================================================================

