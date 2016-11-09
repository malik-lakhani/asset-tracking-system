import axios from 'axios';
import querystring from 'querystring';
import { push } from 'react-router-redux'
import {

	SET_FIELDS, SET_FIELDS_INVOICES,

	FETCH_USERS_SUCCESS, FETCH_USERS_FAILULER, EDIT_USER_SUCCESS, EDIT_USER_FAILULER,
		DELETE_USER_SUCCESS, DELETE_USER_FAILULER, ADD_USER_SUCCESS, ADD_USER_FAILULER,

	FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILULER, EDIT_CATEGORY_SUCCESS, EDIT_CATEGORY_FAILULER,
		DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILULER, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILULER,

	FETCH_MACHINES_SUCCESS, FETCH_MACHINES_FAILULER, EDIT_MACHINE_SUCCESS, EDIT_MACHINE_FAILULER,
		DELETE_MACHINE_SUCCESS, DELETE_MACHINE_FAILULER,FETCH_MACHINES_INFORMATION_SUCCESS,
		FETCH_MACHINES_INFORMATION_FAILULER,

	FETCH_COMPONENTS_SUCCESS, FETCH_COMPONENTS_FAILULER, FETCH_COMPONENT_INFORMATION_SUCCESS,
		FETCH_COMPONENT_INFORMATION_FAILULER,

	FETCH_INVOICES_SUCCESS, FETCH_INVOICES_FAILULER,

	FETCH_INCIDENTS_SUCCESS,FETCH_INCIDENTS_FAILULER

} from '../../constants';

export const setFieldValue = (field, value) => ({
	type: SET_FIELDS,
	field,
	value,
});

//========================Actions Releated to Users=============================

export const fetchUsers = ((All, dispatch) => {
	const URL = "http://localhost:8000/users";
	let all = false;

	if(All == true){
		all = true;
	}
	return function(dispatch) {
		axios.get(URL, { params: { all: all }})
			.then((response) => {
				console.log('response Get users:', response);
				dispatch({ type: FETCH_USERS_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_USERS_FAILULER, err})
			})
		}
});

export const deleteUser = ((id) => {
	let url = 'http://localhost:8000/users/'+ id[0] ;

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
	let url = 'http://localhost:8000/users/' + row.Id ;
	var information = {
		'name' : row.Name,
		'company_email' : row.Company_email,
		'machine_id' : machineId
	}

	// axios({
	//    method: 'patch',
	//    url: url,
	//    data: information
	//  })
	//    .then((response) => {
	//      console.log('success');
	//    })
	//    .catch((err) => {
	//      console.log(DELETE_USER_FAILULER, ':', err);
	//    })

	axios.patch(url,
		querystring.stringify({
			'name' : row.Name,
			'company_email' : row.Company_email,
			'machine_id' : machineId
		}), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				'Access-Control-Allow-Origin': '*'
			}
		}).then(function(response) {
				 console.log('success');
		});

	// axios.PATCH(url, information)
	//   .then(function (res) {
	//     console.log('response of patch : ', res);
	//   })
	//   .catch(function (err) {
	//     console.log('error of patch : ', err);
	//   });
});

export const addUser = ((row, machineId) => {
	const url = "http://localhost:8000/users";
	return function() {
		axios.post(url,
			querystring.stringify({
				'name' : row.Name,
				'company_email' : row.Company_email,
				'machine_id' : machineId
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			})
		}
});

//==============================================================================





//========================Actions Releated to Categories =======================

export const fetchCatogories = ((All, dispatch) => {
	const URL = "http://localhost:8000/components/categories";
	let all = false;

	if(All == true){
		all = true;
	}
	return function(dispatch) {
		axios.get(URL, { params: { all: all }})
			.then((response) => {
				console.log('response Get categories:', response);
				dispatch({ type: FETCH_CATEGORIES_SUCCESS, response })
			})
			.catch((err) => {
				console.log('response Get categories:', err);
				dispatch({ type: FETCH_CATEGORIES_FAILULER, err})
			})
		}
});

export const deleteCategory = ((id) => {
	let url = 'http://localhost:8000/components/categories/'+ id[0] ;

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

export const editCategory = ((row, machineId) => {
	let url = 'http://localhost:8000/components/categories/' + row.Id ;
	var information = {
		'name' : row.Name,
		'company_email' : row.Company_email,
		'machine_id' : machineId
	}

	// axios({
	//    method: 'patch',
	//    url: url,
	//    data: information
	//  })
	//    .then((response) => {
	//      console.log('success');
	//    })
	//    .catch((err) => {
	//      console.log(DELETE_CATEGORY_FAILULER, ':', err);
	//    })

	axios.patch(url,
		querystring.stringify({
			'name' : row.Name,
			'company_email' : row.Company_email,
			'machine_id' : machineId
		}), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				'Access-Control-Allow-Origin': '*'
			}
		}).then(function(response) {
				 console.log('success');
		});

	// axios.PATCH(url, information)
	//   .then(function (res) {
	//     console.log('response of patch : ', res);
	//   })
	//   .catch(function (err) {
	//     console.log('error of patch : ', err);
	//   });
});

export const addCategory = ((row, machineId) => {
	const url = "http://localhost:8000/components/categories";
	return function() {
		axios.post(url,
			querystring.stringify({
				'category' : row.Category,
				'description' : row.Description,
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			})
		}
});

//==============================================================================






//========================Actions Releated to Machines =========================
export const fetchMachines = ((Action, dispatch) => {
	const URL = "http://localhost:8000/machines";
	let allMachine = true;

	if(Action == false){
		allMachine = false;
	}
	return function(dispatch) {
		axios.get(URL, { params: { all: allMachine }})
			.then((response) => {
				console.log('response Get machines:', response);
				dispatch({ type: FETCH_MACHINES_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_MACHINES_FAILULER, err})
			})
		}
});

export const deleteMachine = ((id) => {
	let url = 'http://localhost:8000/machines/'+ id[0] ;

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
	// let url = 'http://localhost:8000/machines/'+id ;
	// return function() {
	// 	axios({
	// 		method: 'delete',
	// 		url: url
	// 	})
	// 		.then((response) => {
	// 			console.log(DELETE_MACHINE_SUCCESS);
	// 		})
	// 		.catch((err) => {
	// 			console.log(DELETE_MACHINE_FAILULER, ':', err);
	// 		})
	// 	}
// });

export const editMachine = ((row) => {
	// console.log('****', row);
	let url = 'http://localhost:8000/machines/' + row.Id ;
	// var information = {
	//   'name' : row.Name,
	//   'company_email' : row.Company_email
	// }
	// console.log('-->', information);
	// axios.PATCH(url, JSON.parse(information))
	//   .then(function (res) {
	//     console.log('response of patch : ', res);
	//   })
	//   .catch(function (err) {
	//     console.log('error of patch : ', err);
	//   });
});

export const addMachine = ((row) => {
	let url = 'http://localhost:8000/machines';
	return function() {
		axios.post(url,
			querystring.stringify({
				name: row.Name
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function(response) {
				console.log('added successfully', response);
		});
	}
});

export const fetchMachineInformation = ((machineId) => {
	const URL = "http://localhost:8000/machines/"+ machineId +"/components";
	return function(dispatch) {
		axios.get(URL)
			.then((response) => {
				console.log('response Get machine Information:', response);
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
	const URL = "http://localhost:8000/components";
	let allComponents = false;

	if(Action == true) {
		allComponents = true;
	}
	return function(dispatch) {
		axios.get(URL, { params: { all: allComponents }})
			.then((response) => {
				console.log('response Get components:', response);
				dispatch({ type: FETCH_COMPONENTS_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_COMPONENTS_FAILULER, err})
			})
		}
});

export const fetchComponentDetails = ((componentId, dispatch) => {
	let URL = `http://localhost:8000/components/${componentId}`

	let allComponents = false;
	return function(dispatch) {
		axios.get(URL)
			.then((response) => {
				console.log('response Get components details:', response);
				dispatch({ type: FETCH_COMPONENT_INFORMATION_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_COMPONENT_INFORMATION_FAILULER, err})
			})
		}
});

export const decommitComponentFromMachine = ((componentId, dispatch) => {
	let URL = `http://localhost:8000/components/${componentId}`

});

//==============================================================================




//========================Actions Releated to Invoices==========================

export const fetchInvoices = ((dispatch) => {
	const URL = "http://localhost:8000/invoices";
	return function(dispatch) {
		axios.get(URL)
			.then((response) => {
				console.log('response Get invoices:', response);
				dispatch({ type: FETCH_INVOICES_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_INVOICES_FAILULER, err})
			})
		}
});

export const setFieldForInvoice = (field, value) => ({
	type: SET_FIELDS_INVOICES,
	field,
	value
});

//==============================================================================




//========================Actions Releated to Incidents=========================

export const fetchIncidents = ((dispatch) => {
	const URL = "http://localhost:8000/incidents";
	return function(dispatch) {
		axios.get(URL)
			.then((response) => {
				console.log('response Get invoices:', response);
				dispatch({ type: FETCH_INCIDENTS_SUCCESS, response })
			})
			.catch((err) => {
				dispatch({ type: FETCH_INCIDENTS_FAILULER, err})
			})
		}
});

export const addIncident = ((component, recorder, title, description, dispatch) => {
	const URL = "http://localhost:8000/incidents";
	let data = {
		component_id: component,
		recorder: recorder,
		title: title,
		description: description
	}
	return function( dispatch) {
		axios.post(URL, data)
			.then(function (response) {
				location.assign('http://localhost:8080/public/#/incidents/');
			})
			.catch(function (error) {
				console.log(error);
			});
		}
});

//==============================================================================

