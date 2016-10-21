import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'react-router'
import './styles.css';

function onAfterSaveCell(row, cellName, cellValue){
	var url = 'http://localhost:8000/machines/'+row.Id ;
	$.ajax({
		url : url,
		data : row,
		type : 'PATCH',
		contentType : 'application/json',
		processData: false,
	});
}

function deleteFromDatabase(id){
	var url = 'http://localhost:8000/machines/'+id ;
	$.ajax({
		url : url,
		type : 'DELETE',
		contentType : 'application/json',
		processData: false,
	});
}

var cellEditProp = {
	mode: "click",
	blurToSave: true,
	afterSaveCell: onAfterSaveCell
}

var selectRowProp = {
	mode: 'radio',
	clickToSelect: true
}

var deleteRow = {
	afterDeleteRow : deleteFromDatabase
}

function machineInformation(cell, row){
	 return <Link to={`/machines/${row.Id}/components`}>{ cell }</Link>
}

class Display_machines extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		// this.getUsers = this.getUsers.bind(this);
		// this.dipslayUsers = this.dipslayUsers.bind(this);
		// // this.fetchMachines = this.fetchMachines.bind(this);
	}

	getUsers() {
		this.props.actions.dipslayUsers(false, this.props.dispatch);
	}

	dipslayUsers(e){
		// var all = false;
		// if(e.target.value == "all"){
		// 	all = true
		// }
		// // console.log(this.props);
		// this.props.actions.filterUsers(all); 
	}

	componentDidMount() {
		this.props.actions.fetchMachines(true, this.props.dispatch);
	}

	render() {
		return (
			<div>
				<select name="select2" onChange={this.dipslayUsers} className="selectpicker" data-width="auto">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					<BootstrapTable data={this.props.state.machines.Machines} pagination={true} options={deleteRow} search={true} striped={true} hover={true}>
						<TableHeaderColumn width="60"  dataSort={true} dataField="Id" isKey={true} >#</TableHeaderColumn>
						<TableHeaderColumn width="260" dataSort={true} dataField="User" dataFormat={machineInformation}>Name</TableHeaderColumn>
						<TableHeaderColumn width="350" dataSort={true} dataField="Name">Current User</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		)
	}
}

export default Display_machines
