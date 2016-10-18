
import {
	ADD_INVOICE,
	SET_FIELDS,
	DISPLAY_USERS,
	DISPLAY_INVOICES,
	FILTERED_USERS
} from '../../constants';
import request from 'superagent';

export const setFieldValue = (field, value) => ({
	type: SET_FIELDS,
	field,
	value,
});

// export const dipslayUsers = ((all, dispatch) => {
//   const URL = "http://localhost:8000/users";
//   let query = {
//     all: false
//   };

//   if(all == "all"){
//     query.all = true;
//   }

//   // Dispatch start of "fetching" action

//   request
//     .get(URL)
//     .query(query)
//     .then((res) => {
//       var data = JSON.parse(res.text);
//       console.log(data);
//       // Dispatch "fetch" success
//       return dispatch({
//         type: DISPLAY_USERS,
//         data,
//       });
//     })
//     .catch((error) => {
//       // TODO: Handle errors
//       // return dispatch();
//     });
// });

export const dipslayUsers = ((all, dispatch) => {
	request
		.get('http://localhost:8000/users')
		.end(function (error, res) {
			var data = JSON.parse(res.text);
			return dispatch({ type: DISPLAY_USERS, data });
		}, function (error) {
			console.log('1111', error);
		});
});



// export const display_machines = (value) => ({
//   type: DISPLAY_MACHINES,
//   value,
// });

// export const dipslayMachines = ((all, dispatch) => {
//  var URL = "http://localhost:8000/machines";
//   let query = {
//     all: false
//   };

//   if(all == "all"){
//     query.all = true;
//   }
//  request
//    .get(URL)
//    .query(query)
//    .then((res) => {
//       var data = JSON.parse(res.text);
//       return dispatch(display_machines(data));
//     });
// });


// export const getUsers = ((dispatch) => {
//  var URL = "http://localhost:8000/users";
//  return request
//    .get(URL)
//    .then((res) => {
//       var data = JSON.parse(res.text);
//       return dispatch(displayUsers(data));
//     });
// });

// export const getUsers = () => {
// 	$.ajax({

//         url: "http://localhost:8000/users",
//         success: function (data) {
//           console.log(data);
//           return{
//             type: DISPLAY_USERS,
//             value,
//           }
//         }
// 	});
// }

// export const getInvoices = () => {
// 	$.ajax({
//         type: "GET",
//         url: "http://localhost:8000/invoices",
//         success: function (data) {
//         	displayInvoices(data);
//         }
// 	});
// }






