import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import request from 'superagent';

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

function afterInsert(){
	alert('called');
}

var deleteRow = {
	afterDeleteRow : deleteFromDatabase,
	afterInsertRow : afterInsert
}

class DataTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: this.props.props.main.data,
		};
		// this.dipslayUsers = this.dipslayUsers.bind(this);
	}

	dipslayUsers(e){
		var all = false;
		if(e.target.value == "all"){
			all = true
		}
		this.getUsers(all); 
	}

	componentDidMount() {
		this.props.actions.dipslayUsers("active", this.props.dispatch);
	}

	render() {
		console.log('####1122state', this.state);
		return (
			<div>
				<select name="select2" onChange={this.dipslayUsers} className="select2">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					<BootstrapTable data={this.state.data} pagination={true} insertRow={true} options={deleteRow} deleteRow={true} selectRow={selectRowProp} cellEdit={cellEditProp}  search={true} striped={true} hover={true}>
						<TableHeaderColumn  width="60" isKey={true} dataSort={true} dataField="Id">#</TableHeaderColumn>
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

export default DataTable