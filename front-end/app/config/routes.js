import React from 'react';
import {Route, Router, hashHistory} from 'react-router';
import Main from '../components/Main';
import Display_invoices from '../containers/invoice/display_invoices_container';
import Edit_invoices from '../containers/invoice/edit_invoice_container';
import Display_users from '../containers/user/display_users_container';
import Add_invoice from '../containers/invoice/add_invoice_container';
import Display_components from '../containers/components/display_components_container';
import Display_machines from '../containers/machines/display_machines_container';
import Display_incidents from '../containers/incidents/display_incidents_container';
import Component_Information from '../containers/components/component_information_container';
import Machine_Information from '../containers/machines/machine_information_container';
import Add_incidents from '../containers/incidents/add_incident_container';

module.exports = (
	<Route path="" >
		<Route path="/" component = { Main } >
			<Route path="/users/add" component = { Display_users } />
			<Route path="/users" component = { Display_users } />
			<Route path="/invoices" component = { Display_invoices } />
			<Route path="/invoices/edit/:invoiceId" component = { Edit_invoices } />
			<Route path="/invoices/add" component = { Add_invoice } />
			<Route path="/components" component = { Display_components } />
			<Route path="/components/:componentId" component = { Component_Information } />
			<Route path="/machines" component = { Display_machines } />
			<Route path="/machines/:machineId/components" component = { Machine_Information } />
			<Route path="/incidents" component = { Display_incidents } />
			<Route path="/incidents/add" component = { Add_incidents } />
		</Route>,
	</Route>
);


