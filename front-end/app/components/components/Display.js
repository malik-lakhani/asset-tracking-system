import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import request from 'superagent';
import { Link } from 'react-router'

function componentInformation(cell, row){
   return <Link to={`/components/${row.Id}`}>{ cell }</Link>
}

class DataTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: this.props.props.main.data,
		};
		this.handleState = this.handleState.bind(this);
		// this.getUsers = this.getUsers.bind(this);
		this.dipslayComponents = this.dipslayComponents.bind(this);
	}

	dipslayComponents(e){
		var all = false;
		if(e.target.value == "all"){
			all = true
		}
		this.displayComponents(all); 
	}

	displayComponents(all) {
		var self = this;
		var URL = "http://localhost:8000/components";
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
		this.displayComponents(false); 
	}

	handleState(e) {
	}

	render() {
		return (
			<div>
				<select name="select2" onChange={this.dipslayComponents} className="select2">
					<option value="active">Active</option>
					<option value="all">All</option>
				</select>
				<div>
					<BootstrapTable data={this.state.data} pagination={true} search={true} striped={true} hover={true}>
						<TableHeaderColumn width="50" isKey={true} dataSort={true} dataField="Id">#</TableHeaderColumn>
						<TableHeaderColumn width="180" dataSort={true} dataField="Serial_no">Serial</TableHeaderColumn>
						<TableHeaderColumn width="180" dataSort={true} dataField="Name" dataFormat={componentInformation}>Name</TableHeaderColumn>
						<TableHeaderColumn width="180" dataField="Warranty_till">Warranty Till</TableHeaderColumn>
						<TableHeaderColumn hidden={true} dataField="invoice_id">Invoice</TableHeaderColumn>
						<TableHeaderColumn width="240" dataSort={true} dataField="Description">Description</TableHeaderColumn>
						<TableHeaderColumn width="150" dataSort={true} dataField="Machine">Machine</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
		)
	}
}

export default DataTable