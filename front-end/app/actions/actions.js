import {

	SET_FIELDS,
	FETCH_USERS_SUCCESS, FETCH_USERS_FAILULER,
  FETCH_MACHINES_SUCCESS, FETCH_MACHINES_FAILULER,
  FETCH_COMPONENTS_SUCCESS, FETCH_COMPONENTS_FAILULER,
  FETCH_INVOICES_SUCCESS, FETCH_INVOICES_FAILULER,
  FETCH_INCIDENTS_SUCCESS,FETCH_INCIDENTS_FAILULER

} from '../../constants';
import axios from 'axios';

// export const setFieldValue = (field, value) => ({
// 	type: SET_FIELDS,
// 	field,
// 	value,
// });

export const fetchUsers = ((All, dispatch) => {
	const URL = "http://localhost:8000/users";
	let all = true;

	if(All == "all"){
	  all = false;
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

export const fetchMachines = ((All, dispatch) => {
  const URL = "http://localhost:8000/machines";
  let all = true;

  if(All == "all"){
    all = false;
  }
  return function(dispatch) {
    axios.get(URL, { params: { all: all }})
      .then((response) => {
        console.log('response Get machines:', response);
        dispatch({ type: FETCH_MACHINES_SUCCESS, response })
      })
      .catch((err) => {
        dispatch({ type: FETCH_MACHINES_FAILULER, err})
      })
    }
});


export const fetchComponents = ((All, dispatch) => {
  const URL = "http://localhost:8000/components";
  let all = true;

  if(All == "all"){
    all = false;
  }
  return function(dispatch) {
    axios.get(URL, { params: { all: all }})
      .then((response) => {
        console.log('response Get components:', response);
        dispatch({ type: FETCH_COMPONENTS_SUCCESS, response })
      })
      .catch((err) => {
        dispatch({ type: FETCH_COMPONENTS_FAILULER, err})
      })
    }
});

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



