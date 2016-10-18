import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import request from 'superagent';
import { Link } from 'react-router'

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

function afterInsert(){
	alert('called');
}

var deleteRow = {
	afterDeleteRow : deleteFromDatabase,
	afterInsertRow : afterInsert
}

function machineInformation(cell, row){
   return <Link to={`/machines/${row.Id}/components`}>{ cell }</Link>
}

class DataTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: this.props.props.main.data,
		};
		this.handleState = this.handleState.bind(this);
		this.getUsers = this.getUsers.bind(this);
		this.dipslayUsers = this.dipslayUsers.bind(this);
		// this.fetchMachines = this.fetchMachines.bind(this);
	}

	getUsers() {
		this.props.actions.dipslayUsers(false, this.props.dispatch);
	}

	dipslayUsers(e){
		var all = false;
		if(e.target.value == "all"){
			all = true
		}
		this.fetchUsers(all); 
	}

	fetchUsers(all) {
		var self = this;
		var URL = "http://localhost:8000/machines";
		request
			.get(URL)
			.query({all: all})
			.then((res) => {
				var data = JSON.parse(res.text);
				self.setState({
					data: data
				})
			});
	}

	componentWillMount() {
		this.fetchUsers(false); 
	}

	handleState(e) {
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<select name="select2" onChange={this.dipslayUsers} className="select2">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					<BootstrapTable data={this.state.data} pagination={true} options={deleteRow} search={true} striped={true} hover={true}>
						<TableHeaderColumn width="60"  dataSort={true} dataField="Id" isKey={true} >#</TableHeaderColumn>
						<TableHeaderColumn width="260" dataSort={true} dataField="Name" dataFormat={machineInformation}>Name</TableHeaderColumn>
						<TableHeaderColumn width="350" dataSort={true} dataField="User">Current User</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		)
	}
}

export default DataTable