import axios from 'axios';
import querystring from 'querystring';
import moment from 'moment';
import { hashHistory } from 'react-router';

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
	let all = false;

	if(All == true){
		all = true;
	}
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/users`;
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
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/users/${id[0]}` ;

		//======To delete multiple user in one attempt =====
		for(let i=1; i<id.length; i++){
			url += ','+id[i]
		}
		//==================================================
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
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/users/${row.Id}` ;
		axios.patch(url,
			querystring.stringify({
				'name' : row.Name,
				'company_email' : row.Company_email,
				'machine_id' : machineId
			})).then(function(response) {
					console.log("Response", response)
					if(response.status == 200) {
						alert("Edited successfully ...")
						dispatch({ type: EDIT_USER_SUCCESS })
					} else {
						dispatch({ type: EDIT_USER_FAILULER })
					}

			}).catch(function (err) {
					console.log('Error From patch User : ', err);
			});
		}
});

export const addUser = ((row, machineId) => {
	return function(dispatch, getState, options) {
		const url = `${options.prefix}/users`;
		axios.post(url,
			querystring.stringify({
				'name' : row.Name,
				'company_email' : row.Company_email,
				'machine_id' : machineId
			}))
		}
});

/*
//==============================================================================


							***	Actions Releated to Categories ***


//==============================================================================
*/

export const fetchCategories = ((All, dispatch) => {
	let all = false;

	if(All == true){
		all = true;
	}
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/components/categories`;
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
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/components/categories/${id[0]}` ;

		//======To delete multiple user in one attempt =====
		for(let i=1; i<id.length; i++){
			url += ','+id[i]
		}
		//==================================================

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
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/components/categories/${row.Id}` ;
		axios.patch(url,
			querystring.stringify({
				'category' : row.Category,
				'description' : row.Description,
			})).then(function(response) {
					console.log('success');
			});
		}
});

export const addCategory = ((row, machineId) => {
	return function(dispatch, getState, options) {
		const url = `${options.prefix}/components/categories`;
		axios.post(url,
			querystring.stringify({
				'category' : row.Category,
				'description' : row.Description,
			}))
		}
});

/*
//==============================================================================


									***		Actions Releated to Machines 	***


//==============================================================================
*/

export const fetchMachines = ((Action) => {
	let allMachine = true;

	if(Action == false) {
		allMachine = false;
	}
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/machines`;
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
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/machines/${id[0]}` ;

		//======To delete multiple user in one attempt =====
		for(let i=1; i<id.length; i++){
			url += ','+id[i]
		}
		//==================================================

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
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/machines/${row.Id}`;
		axios.patch(url,
			querystring.stringify({
				'name' : row.Name,
			})).then(function(response) {
					console.log('Response : ', response);
			}).catch(function (err) {
					console.log('Error From patch User : ', err);
			});
		}
});

export const addMachine = ((row) => {
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/machines`;
		axios.post(url,
			querystring.stringify({
				name: row.Name
			})).then(function(response) {
				console.log('added successfully', response);
		});
	}
});

export const fetchMachineInformation = ((machineId) => {
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/machines/${machineId}/components`;
		axios.get(URL)
			.then((response) => {
				dispatch({ type: FETCH_MACHINES_INFORMATION_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_MACHINES_INFORMATION_FAILULER, err})
			})
		}
});

/*
//==============================================================================


										*** 	Actions Releated to Components 	***


//==============================================================================
*/

export const fetchComponents = ((Action, dispatch) => {
	let allComponents = false;

	if(Action == true) {
		allComponents = true;
	}
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/components`;
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
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/components/filter`;
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
	let allComponents = false;
	return function(dispatch, getState, options) {
		let URL = `${options.prefix}/components/${componentId}`
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
	return function(dispatch, getState, options) {
		let URL = `${options.prefix}/machines/${machineId}/components`
		axios.post(URL,
			querystring.stringify({
				'component_id' : componentId
			})).then((response) => {
				hashHistory.push(`components/${componentId}`);
			})
			.catch((err) => {
				console.log('Error:', err)
			})
		}
});

export const decommitComponentFromMachine = ((componentId, machineId) => {
	return function(dispatch, getState, options) {
		let URL = `${options.prefix}/machines/${machineId}/components/${componentId}`
		axios({
			method: 'delete',
			url: URL
		})
			.then((response) => {
				console.log("Response decommitte component:", response);
				hashHistory.push(`components/`);
			})
			.catch((err) => {
				console.log("Eroor from decommitte component :", err);
			})
		}

});

/*
//==============================================================================


										*** 	Actions Releated to Invoices 	***


//==============================================================================
*/

export const fetchInvoices = ((dispatch) => {
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/invoices`;
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
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/invoices/${invoiceId}`;
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
	//if invoide date not selected than will take the today's date as invoice date..
	if(data.Invoice_date == undefined || data.Invoice_date == '') {
			data.Invoice_date = moment();
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

	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/invoices`;
		axios.post(URL, invoice)
		.then(function (response) {
			resetStateInvoices(dispatch);
			hashHistory.push(`/invoices`)
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

	return function( dispatch, getState, options) {
		let url = `${options.prefix}/invoices/${Id}`;
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
			hashHistory.push(`/invoices`)
		})
		.catch(function (err) {
				console.log("Error")
		});
	}
}

export function resetStateInvoices (dispatch) {
	dispatch({ type: RESET_STATE_INVOICES})
}

/*
//==============================================================================


										*** 	Actions Releated to Incidents 	***


//==============================================================================
*/

export const fetchIncidents = ((Action) => {
	let allIncidents = false;

	if(Action == true) {
		allIncidents = true;
	}
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/incidents`;
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
	let data = {
		component_id: component,
		recorder: recorder,
		title: title,
		description: description
	}
	return function(dispatch, getState, options) {
		const URL = `${options.prefix}/incidents`;
		axios.post(URL, data)
			.then(function (response) {
				hashHistory.push(`/incidents`)
				resetStateIncidents(dispatch)
			})
			.catch(function (error) {
				console.log(error);
			});
		}
});

export const editIncident = ((row, componentId) => {
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/incidents/${row.Id}`;
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
		}
});

function resetStateIncidents (dispatch) {
	dispatch({ type: RESET_STATE_INCIDENTS})
}

export const fetchIncidentInfo = ((incidentId) => {
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/incidents/${incidentId}/incidentInfo`;
		axios.get(url)
			.then((response) => {
				dispatch({ type: FETCH_INCIDENT_INFORMATION_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_INCIDENT_INFORMATION_FAILULER, err})
			})
		}
});

export const addIncidentUpdate = ((incidentId, resolvedBy, description, isResolved) => {
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/incidents/${incidentId}/update?resolved=${isResolved}`;
		axios.post(url, querystring.stringify({
			description: description,
			resolvedBy: resolvedBy
		}))
			.then(function (response) {
				dispatch({ type: ADD_INCIDENT_UPDATE_SUCCESS, response})
				hashHistory.push(`/incidents/${incidentId}`)
			})
			.catch(function (err) {
				dispatch({ type: ADD_INCIDENT_UPDATE_FAILULER, err})
			});
		}
});

export const addReplacedComponent = ((incidentId, resolvedBy, description, component, category, serialNo, warranty) => {
	return function(dispatch, getState, options) {
		let url = `${options.prefix}/incidents/${incidentId}/addComponent`;
		axios.post(url, querystring.stringify({
			description: description,
			resolvedBy: resolvedBy,
			component: component,
			category: category,
			warranty: warranty.value
		}))
			.then(function (response) {
				hashHistory.push(`/incidents/${incidentId}`)
			})
			.catch(function (err) {
				console.log(err);
			});
		}
});


//==============================================================================

