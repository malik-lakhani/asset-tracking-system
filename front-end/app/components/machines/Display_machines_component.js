import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'react-router'
import './styles.css';

function Validator(value){
  if(!value){
    return "*"
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
		console.log("-->", row)
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
		let machines = [];
		if(this.props.state.machines.Machines.length) {
			machines = this.props.state.machines.Machines;
		}
	//===================== style ================================================
		var selectRowProp = {
			mode: "checkbox",
			clickToSelect: true,
			bgColor: "rgb(238, 193, 213)"
		};
	// ===========================================================================


		var table;
		// if (this.props.state.users.AllUsers && this.props.state.users.AllUsers.length) {
		table = (	<BootstrapTable data={ machines }
													pagination={true}
													options={{
														afterDeleteRow: this.deleteMachine,
														onAddRow: this.addMachine
													}}
													exportCSV={true}
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
						<TableHeaderColumn width="60"  dataSort={true} dataField="Id" editable={false} isKey={true}  autoValue={true} hidden={true} >Id</TableHeaderColumn>
						<TableHeaderColumn width="260" dataSort={true} dataField="Name" dataFormat={machineInformation} editable={{ validator:Validator }}>Name</TableHeaderColumn>
						<TableHeaderColumn width="350" dataSort={true} dataField="User" editable={false} hiddenOnInsert={true} autoValue={false}>Current User</TableHeaderColumn>
					</BootstrapTable>);
		// } else {
		// 	table = (<div><div className="panel b block-center text-center"> <h3> You do not have any Data </h3> </div> </div>)
		// }

		return (
			<div>
				<select name="select2" onChange={this.filterMachines} className="selectpicker" data-width="auto">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					{ table }
				</div>
			</div>
		)
	}
}

export default Display_machines
