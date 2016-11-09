import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'react-router'
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

function machineInformation(cell, row){
	 return <Link to={`/machines/${row.Id}/components`}>{ cell }</Link>
}

let userNames = [];
let userIds = [];
class Display_machines extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		this.filterMachines = this.filterMachines.bind(this);
		this.editMachine = this.editMachine.bind(this);
		this.deleteMachine = this.deleteMachine.bind(this);
		this.addMachine = this.addMachine.bind(this);
	}

	addMachine(row) {
    this.props.actions.addMachine(row);
  }

	editMachine(row, cellName, cellValue) {
    this.props.actions.editMachine(row);
  }

  deleteMachine(id) {
  	this.props.actions.deleteMachine(id);
	}

	filterMachines(e) {
		var all = false;
		if(e.target.value == "all") {
			all = true
		}
		this.props.actions.fetchMachines(all, this.props.dispatch);
	}

	componentDidMount() {
		this.props.actions.fetchMachines(false, this.props.dispatch);
		this.props.actions.fetchUsers(false, this.props.dispatch);
	}

	render() {
		let userId;
		for(let i = 0; i < this.props.state.users.AllUsers.length; i++) {
			userIds[i] = this.props.state.users.AllUsers[i].Id;
			userNames[i] = this.props.state.users.AllUsers[i].Name;
		}

		return (
			<div>
				<select name="select2" onChange={this.filterMachines} className="selectpicker" data-width="auto">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					<BootstrapTable data={this.props.state.machines.Machines}
													pagination={true}
													options={{
														afterDeleteRow :this.deleteMachine,
														onAddRow :this.addMachine
													}}
													deleteRow={true}
													selectRow={selectRowProp}
													insertRow={true}
													cellEdit={{
						                mode: "click",
						                blurToSave: true,
						                afterSaveCell: this.editMachine
					                }}
													search={true}
													striped={true}
													hover={true}>
						<TableHeaderColumn width="60"  dataSort={true} dataField="Id" editable={false} isKey={true} autoValue={true} hidden={true} >Id</TableHeaderColumn>
						<TableHeaderColumn width="260" dataSort={true} dataField="Name" dataFormat={machineInformation}>Name</TableHeaderColumn>
						<TableHeaderColumn width="350" dataSort={true} dataField="User" editable={{type:'select', options:{ values:userNames }}} autoValue={true}>Current User</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		)
	}
}

export default Display_machines
