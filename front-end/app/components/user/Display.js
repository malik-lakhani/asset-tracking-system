import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import { Link } from 'react-router'
import './styles.css';

function onAfterSaveCell(row, cellName, cellValue){
	var url = 'http://localhost:8000/users/'+row.Id ;
	$.ajax({
		url : url,
		data : row,
		type : 'PATCH',
		contentType : 'application/json',
		processData: false,
	});
}

function deleteFromDatabase(id){
	var url = 'http://localhost:8000/users/'+id ;
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

class Display_users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data :[]
		};
		// this.filterUsers = this.filterUsers.bind(this);
	}

	filterUsers(e) {
		alert(e.target.value);
		var all = false;
		if(e.target.value == "all") {
			all = true
		}
		this.props.actions.fetchUsers(all, this.props.dispatch);
	}

 	componentDidMount() {
    // Mount Function
    this.props.actions.fetchUsers(true, this.props.dispatch);
  }

	render() {
		return (
			<div>
				<select name="select2" onChange={this.filterUsers} className="selectpicker" data-width="auto">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					<BootstrapTable data={this.props.state.users.AllUsers} pagination={true} insertRow={true} options={deleteRow} deleteRow={true} selectRow={selectRowProp} cellEdit={cellEditProp}  search={true} striped={true} hover={true}>
						<TableHeaderColumn width="60"  dataSort={true} dataField="Id" isKey={true}>#</TableHeaderColumn>
						<TableHeaderColumn width="260" dataSort={true} dataField="Name">User</TableHeaderColumn>
						<TableHeaderColumn width="350" dataSort={true} dataField="Company_email">E-mail</TableHeaderColumn>
						<TableHeaderColumn hidden={true} dataField="Machine_id">Machine Id</TableHeaderColumn>
						<TableHeaderColumn width="150" dataSort={true} dataField="Machine_name">Machine</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		)
	}
}

export default Display_users
