import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from 'react';
import request from 'superagent';

// import Dropdown from 'react-dropdown';

var data = [];
request
	.get('http://localhost:8000/invoices')
	.end(function(err, res){
	if(err != null) {
		console.log(err);
	} else {
		var myData = JSON.parse(res.text);
		data = myData;
	}
});

function linkToEditInvoice(cell, row) {
	return '<a href="http://localhost:8080/public/#/invoices/edit/'+ row.Id +'/?_k=ycsmgk">'+ cell +'</a>';
}

class DataTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.props.main.data,
		};
		this.handleState = this.handleState.bind(this);
		this.getInvoices = this.getInvoices.bind(this);
	}

	getInvoices() {
		var self = this;
		var URL = "http://localhost:8000/invoices";
		request
			.get(URL)
			.then((res) => {
				var data = JSON.parse(res.text);
				self.setState({
					data: data
				})
			});
		}

	componentWillMount() {
		this.getInvoices(); 
	}

	handleState(e) {
	}

	render() {
		return (
			<div>
				<div><a href="http://localhost:8080/public/#/invoices/add/?_k=ycsmgk"><button type="button" className="btn btn-info">Add Invoice</button></a></div>
				<BootstrapTable data={this.state.data} pagination={true} search={true} striped={true} hover={true}>
					<TableHeaderColumn width="60" isKey={true} dataSort={true} dataField="Id">#</TableHeaderColumn>
					<TableHeaderColumn dataSort={true} dataField="Invoice_number" dataFormat={linkToEditInvoice} >Invoice Number</TableHeaderColumn>
					<TableHeaderColumn dataSort={true} dataField="Invoice_date">Invoice Date</TableHeaderColumn>
					<TableHeaderColumn dataSort={true} dataField="Invoicer_name">Invoicer</TableHeaderColumn>
				</BootstrapTable>
			</div>
		)
	}
}

export default DataTable