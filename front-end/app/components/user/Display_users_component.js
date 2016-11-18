import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'react-router'
import axios from 'axios';
import './styles.css';

var selectRowProp = {
	mode: "checkbox",
	clickToSelect: true,
	bgColor: "rgb(238, 193, 213)"
};

function Validator(value){
	if(!value){
		return 'required!'
	}
	return true;
}

let MachineNames = [];
let MachineIds = [];
class Display_users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data :[]
		};
		this.filterUsers = this.filterUsers.bind(this);
		this.editUser = this.editUser.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.addUser = this.addUser.bind(this);
	}

	editUser(row, cellName, cellValue) {
		let indexOfMachineId = MachineNames.indexOf(cellValue);
		let MachineId = MachineIds[indexOfMachineId]
		this.props.actions.editUser(row, MachineId);
	}

	addUser(row) {
		let indexOfMachineId = MachineNames.indexOf(row.Machine_name);
		let MachineId = MachineIds[indexOfMachineId]
		this.props.actions.addUser(row, MachineId);
	}

	deleteUser(id) {
		this.props.actions.deleteUser(id);
	}

	filterUsers(e) {
		var all = false;
		if(e.target.value == "all") {
			all = true
		}
		this.props.actions.fetchUsers(all, this.props.dispatch);
	}

	componentDidMount() {
		this.props.actions.fetchUsers(false);
		this.props.actions.fetchMachines(false);
	}

	render() {
		let MachineId;
		for(let i = 0; i < this.props.state.machines.Machines.length; i++) {
			MachineIds[i] = this.props.state.machines.Machines[i].Id;
			MachineNames[i] = this.props.state.machines.Machines[i].Name;
		}

		return (
			<div>
				<select name="select2" onChange={this.filterUsers} className="selectpicker" data-width="auto">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					<BootstrapTable data={this.props.state.users.AllUsers}
													pagination={true}
													options={{
														afterDeleteRow :this.deleteUser,
														onAddRow :this.addUser
													}}
													deleteRow={true}
													selectRow={selectRowProp}
													insertRow={true}
													exportCSV={false} // to export data in CSV format ....
													cellEdit={{
						                mode: "click",
						                blurToSave: true,
						                afterSaveCell: this.editUser
					                }}
													search={true}
													striped={true}
													hover={true}>
						<TableHeaderColumn width="60"  dataSort={true} dataField="Id" editable={false} isKey={true} autoValue={true} hidden={true} >Id</TableHeaderColumn>
						<TableHeaderColumn width="260" dataSort={true} dataField="Name" editable={{ validator:Validator }} >User</TableHeaderColumn>
						<TableHeaderColumn width="350" dataSort={true} dataField="Company_email" editable={{ validator:Validator }}>E-mail</TableHeaderColumn>
						<TableHeaderColumn width="150" dataSort={true} dataField="Machine_name" editable={{type:'select', options:{ values:MachineNames }}}>Machine</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		)
	}
}

export default Display_users
