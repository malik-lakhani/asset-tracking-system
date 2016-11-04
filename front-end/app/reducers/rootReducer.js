import { combineReducers } from 'redux';
import invoices from './invoice_reducer'
import incidents from './incident_reducer'
import users from './user_reducer'
import machines from './machine_reducer'
import components from './component_reducer'

const rootReducer = combineReducers({
	invoices,
	incidents,
	machines,
	users,
  components,
});

export default rootReducer;
